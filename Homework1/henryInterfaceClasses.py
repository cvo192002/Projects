class Author: 
    def __init__(self, author_num, author_last, author_first): 
        self.author_num = author_num
        self.author_last = author_last
        self.author_first = author_first

    def __str__(self):
        return f"{self.author_first} {self.author_last}"

    def get_author_num(self): 
        return self.author_num

    def get_author_first(self): 
        return self.author_first

    def get_author_last(self): 
        return self.author_last 

class Book: 
    def __init__(self, book_code, book_title, price): 
        self.book_code = book_code
        self.book_title = book_title
        self.price = price 

    def __str__(self): 
        return f"{self.book_title}"

    def get_book_code(self): 
        return self.book_code
    def get_price(self): 
        return self.price


class Branch: 
    def __init__ (self, branch_name, on_hand ): 
        self.on_hand = on_hand 
        self.branch_name = branch_name 

    def __str__(self): 
        return f"{self.branch_name}{self.on_hand}"

    def get_branch_name(self): 
        return self.branch_name
    def get_on_hand(self):
        return self.on_hand


class Inventory: 
    def __init__(self, branch_num, book_code, on_hand):
        self.branch_num = branch_num 
        self.book_code = book_code
        self.on_hand = on_hand
    def __str__(self): 
        return f"{self.on_hand}"
    def get_book_code(self):
        return self.book_code

    def get_branch_num(self): 
        return self.branch_num
    def get_on_hand(self):
        return self.on_hand


