"""Fetch the Airbnb iCal export and write the booked date ranges to data/availability.json.

The iCal link is secret, so it is read from the AIRBNB_ICAL_URL environment variable
(a GitHub Actions secret) and never stored in the repository. Only start/end dates are
saved; no guest details.
"""
import datetime as dt
import json
import os
import re
import sys
import urllib.request

url = os.environ.get("AIRBNB_ICAL_URL", "").strip()
if not url:
    sys.exit("AIRBNB_ICAL_URL is not set")

req = urllib.request.Request(url, headers={"User-Agent": "ipatiforestchalet-calendar-sync"})
with urllib.request.urlopen(req, timeout=30) as r:
    text = r.read().decode("utf-8", "replace")

if "BEGIN:VCALENDAR" not in text:
    sys.exit("Response is not an iCal calendar")

text = re.sub(r"\r?\n[ \t]", "", text)  # unfold folded lines


def parse_date(line):
    value = line.split(":", 1)[1].strip()
    return dt.date(int(value[0:4]), int(value[4:6]), int(value[6:8]))


today = dt.date.today()
ranges = []
for block in text.split("BEGIN:VEVENT")[1:]:
    start = end = None
    for line in block.splitlines():
        if line.startswith("DTSTART"):
            start = parse_date(line)
        elif line.startswith("DTEND"):
            end = parse_date(line)
    if start and end and end > today:
        ranges.append([start, end])

ranges.sort()
merged = []
for s, e in ranges:
    if merged and s <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], e)
    else:
        merged.append([s, e])

out = {
    "updated": dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat(),
    "booked": [{"start": s.isoformat(), "end": e.isoformat()} for s, e in merged],
}
path = os.path.join(os.path.dirname(__file__), "..", "data", "availability.json")
with open(path, "w", encoding="utf-8") as f:
    json.dump(out, f, indent=2)
    f.write("\n")
print(f"{len(merged)} booked ranges written")
