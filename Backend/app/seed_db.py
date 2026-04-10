"""
Seed script to populate Supabase with initial HR data.
Run with: python -m app.seed_db
"""

from app.database import SessionLocal, engine, Base
from app.models import Position, Candidate
from datetime import datetime

# Create all tables
Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()
    
    try:
        # Clear existing data
        db.query(Candidate).delete()
        db.query(Position).delete()
        db.commit()
        
        # Create positions
        positions_data = [
            {
                "name": "Senior Frontend Engineer",
                "requirements": "React,TypeScript,CSS",
                "niceToHave": "Next.js,Testing",
                "deadline": "2024-12-31",
                "aboutWork": "Build modern web applications using React and TypeScript",
                "locationType": "Remote",
            },
            {
                "name": "Backend Engineer",
                "requirements": "Python,FastAPI,SQL",
                "niceToHave": "Docker,Kubernetes",
                "deadline": "2024-12-31",
                "aboutWork": "Develop scalable backend APIs using FastAPI",
                "locationType": "Hybrid",
            },
            {
                "name": "Full Stack Developer",
                "requirements": "React,Node.js,MongoDB",
                "niceToHave": "GraphQL,AWS",
                "deadline": "2024-12-31",
                "aboutWork": "Work across the entire stack with modern technologies",
                "locationType": "On-site",
            },
        ]
        
        positions = []
        for pos_data in positions_data:
            position = Position(**pos_data)
            db.add(position)
            positions.append(position)
        
        db.commit()
        
        # Create candidates
        candidates_data = [
            # Senior Frontend Engineer - Applying Period
            {"name": "Alice Chen", "email": "alice@example.com", "phone": "555-0101", "role": "Senior Frontend", 
             "appliedPosition": "Senior Frontend Engineer", "stage": "Applying Period", 
             "applicationDate": "2024-10-15", "location": "San Francisco"},
            {"name": "Bob Kumar", "email": "bob@example.com", "phone": "555-0102", "role": "Frontend Dev",
             "appliedPosition": "Senior Frontend Engineer", "stage": "Applying Period",
             "applicationDate": "2024-10-16", "location": "New York"},
            
            # Senior Frontend Engineer - Screening
            {"name": "Carol Smith", "email": "carol@example.com", "phone": "555-0103", "role": "Senior Frontend",
             "appliedPosition": "Senior Frontend Engineer", "stage": "Screening",
             "applicationDate": "2024-10-10", "location": "Austin"},
            {"name": "David Lee", "email": "david@example.com", "phone": "555-0104", "role": "Frontend",
             "appliedPosition": "Senior Frontend Engineer", "stage": "Screening",
             "applicationDate": "2024-10-11", "location": "Seattle"},
            
            # Senior Frontend Engineer - Interview
            {"name": "Emma Wilson", "email": "emma@example.com", "phone": "555-0105", "role": "Senior Frontend",
             "appliedPosition": "Senior Frontend Engineer", "stage": "Interview",
             "applicationDate": "2024-10-05", "location": "Portland"},
            {"name": "Frank Brown", "email": "frank@example.com", "phone": "555-0106", "role": "Frontend Lead",
             "appliedPosition": "Senior Frontend Engineer", "stage": "Interview",
             "applicationDate": "2024-10-06", "location": "Boston"},
            
            # Senior Frontend Engineer - Test
            {"name": "Grace Johnson", "email": "grace@example.com", "phone": "555-0107", "role": "Senior Frontend",
             "appliedPosition": "Senior Frontend Engineer", "stage": "Test",
             "applicationDate": "2024-10-01", "location": "Chicago"},
            
            # Backend Engineer - Applying Period
            {"name": "Henry Zhang", "email": "henry@example.com", "phone": "555-0108", "role": "Backend Engineer",
             "appliedPosition": "Backend Engineer", "stage": "Applying Period",
             "applicationDate": "2024-10-20", "location": "San Francisco"},
            {"name": "Ivy Patel", "email": "ivy@example.com", "phone": "555-0109", "role": "Python Dev",
             "appliedPosition": "Backend Engineer", "stage": "Applying Period",
             "applicationDate": "2024-10-21", "location": "Bangalore"},
            
            # Backend Engineer - Screening
            {"name": "Jack Davis", "email": "jack@example.com", "phone": "555-0110", "role": "Backend Engineer",
             "appliedPosition": "Backend Engineer", "stage": "Screening",
             "applicationDate": "2024-10-15", "location": "Denver"},
            {"name": "Karen White", "email": "karen@example.com", "phone": "555-0111", "role": "Full Stack",
             "appliedPosition": "Backend Engineer", "stage": "Screening",
             "applicationDate": "2024-10-16", "location": "Miami"},
            
            # Backend Engineer - Interview
            {"name": "Leo Martinez", "email": "leo@example.com", "phone": "555-0112", "role": "Senior Backend",
             "appliedPosition": "Backend Engineer", "stage": "Interview",
             "applicationDate": "2024-10-10", "location": "Los Angeles"},
            
            # Full Stack - Applying Period
            {"name": "Maya Singh", "email": "maya@example.com", "phone": "555-0113", "role": "Full Stack Dev",
             "appliedPosition": "Full Stack Developer", "stage": "Applying Period",
             "applicationDate": "2024-10-22", "location": "Toronto"},
            {"name": "Nathan Clark", "email": "nathan@example.com", "phone": "555-0114", "role": "Full Stack",
             "appliedPosition": "Full Stack Developer", "stage": "Applying Period",
             "applicationDate": "2024-10-23", "location": "Vancouver"},
            
            # Full Stack - Screening
            {"name": "Olivia Garcia", "email": "olivia@example.com", "phone": "555-0115", "role": "Full Stack",
             "appliedPosition": "Full Stack Developer", "stage": "Screening",
             "applicationDate": "2024-10-18", "location": "Mexico City"},
            {"name": "Paul Rodriguez", "email": "paul@example.com", "phone": "555-0116", "role": "MERN Dev",
             "appliedPosition": "Full Stack Developer", "stage": "Screening",
             "applicationDate": "2024-10-19", "location": "Miami"},
            
            # Full Stack - Interview
            {"name": "Quinn Taylor", "email": "quinn@example.com", "phone": "555-0117", "role": "Senior Full Stack",
             "appliedPosition": "Full Stack Developer", "stage": "Interview",
             "applicationDate": "2024-10-12", "location": "Atlanta"},
            
            # Full Stack - Test
            {"name": "Rachel Green", "email": "rachel@example.com", "phone": "555-0118", "role": "Full Stack",
             "appliedPosition": "Full Stack Developer", "stage": "Test",
             "applicationDate": "2024-10-08", "location": "Dallas"},
            {"name": "Samuel Hall", "email": "samuel@example.com", "phone": "555-0119", "role": "Senior Full Stack",
             "appliedPosition": "Full Stack Developer", "stage": "Test",
             "applicationDate": "2024-10-09", "location": "Houston"},
        ]
        
        for candidate_data in candidates_data:
            candidate = Candidate(**candidate_data)
            db.add(candidate)
        
        db.commit()
        print("✅ Database seeded successfully!")
        print(f"   Created {len(positions)} positions")
        print(f"   Created {len(candidates_data)} candidates")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
