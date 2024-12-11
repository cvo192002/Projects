from henryInterfaceClasses import *
import mysql.connector


class HenryDAO: 
    def __init__(self):
        
        try:
            self.connection = mysql.connector.connect(host='localhost',
                                                database='comp3421',
                                                user='root',
                                                password='Dramalove2020!')
            self.cursor = self.connection.cursor()


        except mysql.connector.Error as error: 
            print("Failed to insert into MySQL table {}".format(error))

    def author_data(self):
        try: 
            mySql_select_query = """ SELECT AUTHOR_NUM, AUTHOR_LAST, AUTHOR_FIRST FROM HENRY_AUTHOR """
            self.cursor.execute(mySql_select_query)
            author_name = self.cursor.fetchall() #this will fetch a list of tuples 
            myList =  [] 

            for author in author_name:
                author_object = Author(author[0], author[1], author[2])
                myList.append(author_object)

            return myList

        except mysql.connector.Error as err:
            print(f"Error fetching authors: {err}")
            return []
    
    def book_data(self): #HenrySBA
        try: 
            mySql_select_query = """ SELECT BOOK_CODE, TITLE, PRICE FROM HENRY_BOOK """
            self.cursor.execute(mySql_select_query)
            book_info = self.cursor.fetchall() # This will fetch a list of tuples 
            myList =  [] 

            for book in book_info:
                book_object = Book(book[0], book[1], book[2])
                myList.append(book_object)

            return myList

        except mysql.connector.Error as err:
            print(f"Error fetching authors: {err}")
            return []

    def branch_data(self): 
        try: 
            mySql_select_query = """ SELECT BRANCH_NAME, ON_HAND FROM HENRY_BRANCH 
            JOIN HENRY_INVENTORY ON HENRY_BRANCH.BRANCH_NUM  = HENRY_INVENTORY.BRANCH_NUM """
            self.cursor.execute(mySql_select_query)
            branch_info = self.cursor.fetchall() # This will fetch a list of tuples of branch name and copies 
            myList =  [] 

            for branch in branch_info:
                branch_object = Branch(branch[0], branch[1])
                myList.append(branch_object)

            return myList

        except mysql.connector.Error as err:
            print(f"Error fetching authors: {err}")
            return []
        
    def category_data(self): #HenrySBC
        try:
            mySql_select_query = """ SELECT DISTINCT TYPE FROM HENRY_BOOK """
            self.cursor.execute(mySql_select_query)
            category_info = self.cursor.fetchall()  # This will fetch a list of tuples
            myList = []

            for category in category_info:
                category_object = category[0]  
                myList.append(category_object)

            return myList

        except mysql.connector.Error as err:
            print(f"Error fetching categories: {err}")
            return []
    
    def publisher_data(self): #HenrySBP
        try:
            mySql_select_query = """SELECT DISTINCT PUBLISHER_CODE FROM HENRY_BOOK"""
            self.cursor.execute(mySql_select_query)
            publisher_info = self.cursor.fetchall() # This will fetch a list of tuples
            publishers = [publisher[0] for publisher in publisher_info]   
            return publishers
        
        except mysql.connector.Error as err:
            print(f"Error fetching publishers: {err}")
            return []

    def get_books_by_author(self, author_num):
        try:
            mySql_select_query = """SELECT HENRY_BOOK.BOOK_CODE, HENRY_BOOK.TITLE, HENRY_BOOK.PRICE
                                    FROM HENRY_BOOK
                                    JOIN HENRY_WROTE ON HENRY_BOOK.BOOK_CODE = HENRY_WROTE.BOOK_CODE
                                    WHERE HENRY_WROTE.AUTHOR_NUM = %s"""
            self.cursor.execute(mySql_select_query, (author_num,))
            book_info = self.cursor.fetchall()
            books = []
            for book in book_info:
                books.append(Book(book[0], book[1], book[2]))
            return books
        except mysql.connector.Error as err:
            print(f"Error fetching books: {err}")
            return []

    def get_inventory_by_book(self, book_code):
        try:
            mySql_select_query = """SELECT HENRY_BRANCH.BRANCH_NAME, HENRY_INVENTORY.ON_HAND
                                    FROM HENRY_INVENTORY
                                    JOIN HENRY_BRANCH ON HENRY_INVENTORY.BRANCH_NUM = HENRY_BRANCH.BRANCH_NUM
                                    WHERE HENRY_INVENTORY.BOOK_CODE = %s"""
            self.cursor.execute(mySql_select_query, (book_code,))
            branch_info = self.cursor.fetchall()
            branches = []
            for branch in branch_info:
                branches.append(Branch(branch[0], branch[1]))
            return branches
        except mysql.connector.Error as err:
            print(f"Error fetching inventory: {err}")
            return []
    
    def get_books_by_type(self, book_type):
        try:
            mySql_select_query = """SELECT BOOK_CODE, TITLE, PRICE
                                    FROM HENRY_BOOK
                                    WHERE TYPE = %s"""
            self.cursor.execute(mySql_select_query, (book_type,))
            book_info = self.cursor.fetchall()
            books = []
            for book in book_info:
                books.append(Book(book[0], book[1], book[2]))
            return books
        except mysql.connector.Error as err:
            print(f"Error fetching books by type: {err}")
            return []
    def get_books_by_publisher(self, publisher_name):
        try: 
            mySql_select_query = """SELECT BOOK_CODE, TITLE, PRICE
                                    FROM HENRY_BOOK
                                    WHERE PUBLISHER_CODE = %s"""
            self.cursor.execute(mySql_select_query, (publisher_name,))
            book_info = self.cursor.fetchall()
            books =[]
            for book in book_info:
                    books.append(Book(book[0], book[1], book[2]))
            return books
        except mysql.connector.Error as err:
            print(f"Error fetching books by type: {err}")
            return []