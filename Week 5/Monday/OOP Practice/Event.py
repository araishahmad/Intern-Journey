from dataclasses import dataclass, field
from Attendee import Attendee

@dataclass
class Event:
    title: str
    date: str
    attendees: list[Attendee] = field(default_factory = list)

    def add_attendees(self, attendee):
        self.attendees.append(attendee)

    def count_attendees(self):
        return len(self.attendees)