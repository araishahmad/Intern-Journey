from dataclasses import dataclass


@dataclass
class Attendee:
    name: str
    age: int
    email: str

    def introduce(self, event_name):
        print(f'Hi {self.name} {self.age} years old joined {event_name}')