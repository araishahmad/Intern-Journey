from Attendee import Attendee
from Event import Event

event = Event("Python OOP", "2026-07-30")
print(event.attendees)

event.add_attendees(attendee=Attendee("Araish", 23, "araish@gmail.com"))
print(event.attendees)

print(event.count_attendees())

for person in event.attendees:
    person.introduce(event.title)
