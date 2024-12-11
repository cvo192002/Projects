# Imports
import tkinter as tk 
from tkinter import ttk 
from HenryDAO import HenryDAO
from henryInterfaceClasses import *


# Search by Category Class Creation
class HenrySBC:
    def __init__(self, frame):
        self.info = HenryDAO()
        categories = self.info.category_data()  # Fetch categories (types)
        
        # Label 
        self.category_label = ttk.Label(frame)
        self.category_label.grid(column=1, row=2)
        self.category_label['text'] = "Category Selection:"
        
        # Combobox Creation (based off guiExample.py)
        self.category_combobox = ttk.Combobox(frame, width=20, state="readonly")
        self.category_combobox.grid(column=1, row=3)
        self.category_combobox.bind("<<ComboboxSelected>>", self.update_books_by_category)
        self.category_combobox['values'] = categories  # Populate combobox with categories
        self.categories = categories

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
    def update_books_by_category(self, event):
        selected_category_index = self.category_combobox.current()  # Gathers the index for category(type)
        if selected_category_index == -1:
            return  
        category = self.categories[selected_category_index]  # Get the selected category
        books = self.info.get_books_by_type(category)  # Fetch books by category
        self.book_combobox['values'] = books  
        self.books = books
        # Auto-selects the first book when a category(type) is selected, 
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
