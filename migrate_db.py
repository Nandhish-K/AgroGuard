"""
Database migration script to add new profile fields
Run this script to update existing database with new columns
"""
import sqlite3
import os

def migrate_database():
    # Check multiple possible locations
    db_paths = ['agroguard.db', 'instance/agroguard.db']
    db_path = None
    
    for path in db_paths:
        if os.path.exists(path):
            db_path = path
            break
    
    if not db_path:
        print(f"Database not found in any of these locations: {db_paths}")
        print("Please run the server first to create the database.")
        return
    
    print(f"Found database at: {db_path}")
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if columns already exist
    cursor.execute("PRAGMA table_info(users)")
    columns = [column[1] for column in cursor.fetchall()]
    
    new_columns = {
        'bio': 'TEXT',
        'location': 'VARCHAR(100)',
        'phone': 'VARCHAR(20)'
    }
    
    # Add new columns if they don't exist
    for column_name, column_type in new_columns.items():
        if column_name not in columns:
            try:
                cursor.execute(f"ALTER TABLE users ADD COLUMN {column_name} {column_type}")
                print(f"✅ Added column: {column_name}")
            except sqlite3.OperationalError as e:
                print(f"⚠️  Column {column_name} might already exist: {e}")
    
    conn.commit()
    conn.close()
    print("\n✅ Database migration completed successfully!")

if __name__ == "__main__":
    migrate_database()
