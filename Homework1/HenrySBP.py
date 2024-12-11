# Imports
import tkinter as tk 
from tkinter import ttk 
from HenryDAO import HenryDAO
from henryInterfaceClasses import *


# Search by Publisher Class Creation
class HenrySBP:
    def __init__(self, frame):
        self.info = HenryDAO()
        publishers = self.info.publisher_data()  

        # Label
        self.publisher_label = ttk.Label(frame)
        self.publisher_label.grid(column=1, row=2)
        self.publisher_label['text'] = "Publisher Selection:"

        # Combobox Creation (based off guiExample.py)
        self.publisher_combobox = ttk.Combobox(frame, width=20, state="readonly")
        self.publisher_combobox.grid(column=1, row=3)
        self.publisher_combobox.bind("<<ComboboxSelected>>", self.update_books_by_publisher)
        self.publisher_combobox['values'] = publishers  # Populate combobox with publisher names
        self.publishers = publishers

        # Label Implementation
        self.book_label = ttk.Label(frame)
        self.book_label.grid(column=8, row=2)
        self.book_label['text'] = "Book Selection:"
        # Combobox Implementation
        self.book_combobox = ttk.Combobox(frame, width=20, state="readonly")
        self.book_combobox.grid(column=8, row=3)
        self.book_combobox.bind("<<ComboboxSelected>>", self.update_branch_and_price)

        # Treeview
        self.tree = ttk.Treeview(frame, columns=('Branch', 'Copies'), show='headings')
        self.tree.heading('Branch', text='Branch Name')
        self.tree.heading('Copies', text='Copies Available')
        self.tree.grid(column=1, row=1)

        # Price
        self.price_label = ttk.Label(frame)
        self.price_label.grid(column=8, row=1)

    # This will update the book selected inside the combobox.
    def update_books_by_publisher(self, event):
        selected_publisher_index = self.publisher_combobox.current()  # Gathers the index for publisher (publisher code)
        if selected_publisher_index == -1:
            return  
        publisher = self.publishers[selected_publisher_index]  # Get the selected publisher
        books = self.info.get_books_by_publisher(publisher)  # Fetch books by publisher
        self.book_combobox['values'] = books
        self.books = books
        # Auto-selects the first book when a publisher is selected, 
        # it also updates branch and price
        if books:
            self.book_combobox.current(0)  # Select the first book
            self.update_branch_and_price(None)  # Trigger the update for branches and price

    def update_branch_and_price(self, event):
        selected_book_index = self.book_combobox.current() # Gathers the index for the selected book
        if selected_book_index == -1:
            return  # No book selected, creates that blank selection if no book is selected

        selected_book = self.books[selected_book_index]

        # Update the branches inside the Treeview  
        branches = self.info.get_inventory_by_book(selected_book.get_book_code())
       
        for row in self.tree.get_children():
            self.tree.delete(row)

        # Insert updated branch and copy information
        for branch in branches:
            self.tree.insert("", "end", values=[branch.get_branch_name(), branch.get_on_hand()])

        # Update the price label
        self.price_label['text'] = f"Price: ${selected_book.get_price():.2f}"
