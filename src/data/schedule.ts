export interface FestEvent {
  id: number;
  name: string;
  category: 'Music' | 'Tech' | 'Dance' | 'Misc';
  day: number;
  time: string;
  venue: string;
  registrations: number;
}

export const events: FestEvent[] = [
  { id: 1, name: "Rocktaves", category: "Music", day: 1, time: "22:00", venue: "Auditorium", registrations: 1125 },
  { id: 2, name: "Code Relay", category: "Tech", day: 2, time: "10:00", venue: "NAB Audi", registrations: 278 },
  { id: 3, name: "Robowars", category: "Tech", day: 0, time: "21:00", venue: "Rotunda", registrations: 820 },
  { id: 4, name: "Street Dance", category: "Dance", day: 1, time: "17:00", venue: "Clock Tower", registrations: 540 },
  { id: 5, name: "Hackathon", category: "Tech", day: 2, time: "09:00", venue: "Library", registrations: 450 },
  { id: 6, name: "Battle of Bands", category: "Music", day: 3, time: "19:00", venue: "Main Stage", registrations: 1500 },
  { id: 7, name: "Classical Night", category: "Music", day: 0, time: "18:30", venue: "Auditorium", registrations: 420 },
  { id: 8, name: "Drone Racing", category: "Tech", day: 1, time: "14:00", venue: "Sports Field", registrations: 610 },
  { id: 9, name: "Capture the Flag", category: "Tech", day: 3, time: "11:00", venue: "Computer Lab", registrations: 340 },
  { id: 10, name: "Salsa Workshop", category: "Dance", day: 2, time: "16:00", venue: "Student Union", registrations: 210 },
  { id: 11, name: "Hip Hop Cypher", category: "Dance", day: 3, time: "20:00", venue: "Clock Tower", registrations: 780 },
  { id: 12, name: "Standup Comedy", category: "Misc", day: 1, time: "21:30", venue: "NAB Audi", registrations: 1200 },
  { id: 13, name: "Treasure Hunt", category: "Misc", day: 2, time: "08:00", venue: "Campus Wide", registrations: 950 },
  { id: 14, name: "Debate Tournament", category: "Misc", day: 0, time: "10:00", venue: "Seminar Hall", registrations: 180 },
  { id: 15, name: "AI Pitch Deck", category: "Tech", day: 1, time: "13:00", venue: "Incubation Center", registrations: 410 },
  { id: 16, name: "Acoustic Sunset", category: "Music", day: 2, time: "17:30", venue: "Open Air Theatre", registrations: 630 },
  { id: 17, name: "Folk Dance Fest", category: "Dance", day: 0, time: "19:00", venue: "Main Stage", registrations: 890 },
  { id: 18, name: "Gaming Expo", category: "Tech", day: 3, time: "10:00", venue: "Indoor Stadium", registrations: 2100 },
  { id: 19, name: "Photography Walk", category: "Misc", day: 1, time: "07:00", venue: "Main Gate", registrations: 150 },
  { id: 20, name: "DJ Night", category: "Music", day: 3, time: "23:00", venue: "Main Stage", registrations: 3500 },
];