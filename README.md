# parkeasy
Help drivers quickly find available parking spaces nearby, saving time, reducing stress, and minimizing traffic congestion.
## Target Users
Drivers in urban areas who need quick and reliable parking solutions, including daily commuters, delivery drivers, ride-share drivers, and tourists.
## Features
### Must Have
- Feature 1: [GPS-based location detection: Automatically detects the user’s current location when the app opens.]
- Feature 2: [Nearby parking spots map: Displays available parking spots around the user in real-time.]
- Feature 3: [Spot details: Shows price, distance, type (disable,delivery…), free/paid status, and hours of operation.]
### Should Have
- Feature 4: [Navigation: Provides turn-by-turn directions to the selected adress.]
- Feature 5: [Real-time updates: Users can see live availability using community reports.]
### Could Have
- Feature 6: [Payment integration: Pay for parking directly through the app.]
- Feature 7: [Implement location: Address-based parking availability.]
## Data Model
- **ParkingSpot**: id, name, location (latitude, longitude), price, type (disable,delivery…), hours, availability
- **User**: id, name, email, payment_info, driver_license
- **Report**: user_id, parking_spot_id, availability_status, timestamp
## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Deployed on Vercel
- Payment integration (Stripe/PayPal)
- Google Maps API / Mapbox for maps 
## Design
https://www.figma.com/design/jHQup1CVgRovSQRL6Mq5Sa/parkeasy-design?node-id=0-1&t=iEDD6QvJsg0m6kjJ-1
