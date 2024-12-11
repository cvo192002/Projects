# Imports
import tkinter as tk 
from tkinter import ttk 
from HenrySBA import HenrySBA
from HenrySBC import HenrySBC
from HenrySBP import HenrySBP

# Each tab will have its own class. Call these classes: HenrySBA, HenrySBC, and HenrySBP


#Main GUI Interface 
root = tk.Tk()
root.title("Henry Bookstore")
root.geometry('800x600') 

# Tab control
tabControl = ttk.Notebook(root)
tab1 = ttk.Frame(tabControl)
tab2 = ttk.Frame(tabControl)
tab3 = ttk.Frame(tabControl)
tabControl.add (tab1, text = "Search by Author")
tabControl.add (tab2, text = "Search by Catergory")
tabControl.add (tab3, text = "Search by Pubilsher")
HenrySBA(tab1)
HenrySBC(tab2)
HenrySBP(tab3)


tabControl.pack(expand = 1, fill ="both") 


root.mainloop()