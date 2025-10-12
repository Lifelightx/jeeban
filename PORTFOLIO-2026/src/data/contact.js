export default `# contact.py

class ContactInfo:
    def __init__(self):
        self.name = "Jeebanjyoti Mallik"
        self.role = "Fullstack Developer"
        self.location = "India 🇮🇳"
        self.email = "jeebanjyotimallik01@gmail.com"
        self.github = "https://github.com/Lifelightx"
        self.linkedin = "https://www.linkedin.com/in/jeebanjyoti/"
        self.portfolio = "https://jeeban-portfolio.onrender.com"

    def show_contact(self):
        print(f"""
        Name       : {self.name}
        Role       : {self.role}
        Location   : {self.location}
        Email      : {self.email}
        GitHub     : {self.github}
        LinkedIn   : {self.linkedin}
        Portfolio  : {self.portfolio}
        """)

# Example usage
if __name__ == "__main__":
    contact = ContactInfo()
    contact.show_contact()
`