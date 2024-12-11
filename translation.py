import dudraw 
import random 
from random import randint
# Docstring required at the beginning of every program:
# Docstring at the top of every program
"""
    Description of program: This game will have an rna strand that will grow to make a protein, 
    the goal is to connect the right trna to the corresponding letters   
    Filename:translation.py
    Author: Christy Vo
    Date: 06.21.23
    Course: Dr.Horowitz Lab
    Assignment: Summer Research Project
    Collaborators: Mohammed Albow
    Internet Source: None
"""

class Node: 
    def __init__(self, v, p ,n): 
        self.value = v 
        self.prev = p
        self.next = n 
    def __str__(self):
        return str(self.value)
class DoublyLinkedList: 
    def __init__(self):
        self.header = Node (None, None, None)
        self.trailer = Node(None, self.header, None)
        self.header.next = self.trailer 
        self.size = 0
    def __str__(self): 
        if self.header is None:
            return '[]'
        result = '['
        temp_node = self.header.next
        while not temp_node.next is self.trailer:
            result += str(temp_node) + " "
            temp_node = temp_node.next
        result += str(temp_node) + "]"
        return result
    """
        Description of function: this function will allow us to add between any node in the DDL
        parameters: value, and the nodes you are inserting betweeen
        return:none 
    """
    def add_between(self, v, n1,n2):
        if n1 is None or n2 is None: 
            raise ValueError("Nodes cannot be None")
        if n1.next is not n2:
            raise ValueError ("Node 2 must follow Node 1")

        #step 1 made a new node. value v prev is n1 and next 
        new_node = Node(v, n1, n2)
        #step 2 n1.next points to the new node 
        n1.next = new_node 
        #step3: n2.prev points to the new node 
        n2.prev = new_node

        self.size+=1 
    """
        Description of function: this will add a node to the top of the DLL
        parameters:  value
        return:none 
    """
    def add_first(self,v): 
        self.add_between( v, self.header, self.header.next)
    """
        Description of function: this will add a node to the end of the D::
        parameters: value
        return:none
"""
    def add_last (self, v): 
        self.add_between(v, self.trailer.prev, self.trailer)
    """
        Description of function: this removes between two nodes 
        parameters: two nodes 
        return: the value of the node being removed 
"""
    def remove_between(self,  n1, n2):
        return_value = n1.next 
        if n1.next is n2: 
            raise ValueError("There is no Node in between them")
        if n1 is None or n2 is None: 
            raise ValueError("Nodes cannot be None")
        n1.next = n2 
        n2.prev = n1
        self.size-=1 
        return return_value 
    """
        Description of function: will remove the first node in the list 
        parameters: none
        return:none
"""
    def remove_first(self): 
        self.remove_between(self.header, self.header.next.next)
        """
        Description of function: will remover the last node in the list 
        parameters: nonw
        return:none
"""
    def remove_last(self):
        self.remove_between(self.trailer.prev.prev, self.trailer)
    """
        Description of function: allows us to search for a value in the list 
        parameters: value you are looking for 
        return: index of where the value is 
"""
    def search (self, v): 
        temp = self.header.next
        for i in range(self.size):
            if temp.value == v: 
                return i
            else: 
                temp = temp.next
        return('-1')
    """
    Description of function: This will prin the DlL in reverse order 
    parameters: None 
    return:None
"""
    def print_backwards(self): 
        temp = self.trailer.prev
        for i in range (self.size):
            print(temp.value) 
            temp = temp.prev
    """
        Description of function: this allow us to access the first node of the Dll
        parameters:  none
        return: head of the dll
"""
    def first(self):
        if self.size == 0: 
            print('The list is empty')
            return None
        temp = self.header.next.value 
        return temp 
    """
        Description of function: this allows us to access the last node of the DLL
        parameters: none
        return: tail of the dll
"""
    def last (self): 
        temp = self.trailer.prev.value 
        return temp 
    """
        Description of function: will allow us to access a value in the dll
        parameters: index 
        return: value of the index chosen
"""
    def get (self, index):
        if index<0 or index>self.size-1:
            raise IndexError('Index out of range')
        temp = self.header.next
        for i in range (index):
            temp = temp.next
        return temp.value

    def __iter__(self): 
        return dlliterator(self.header.next)
class dlliterator: 
    def __init__(self, head): 
        self.current = head

    def __iter__(self): 
        return self
    
    def __next__(self): 
        if self.current.next is None: 
            raise StopIteration()
        rv = self.current.value
        self.current = self.current.next 
        return rv 



#create a dictionary w the right codons to create a growing chain of amino acids 
minicodondict = {'A': 'U', 'G': 'C', 'C': 'G', 'U': 'A'}
aminoaciddict =  {'UUU':'Phe', 'UUC': 'Phe' ,  'UUA':'Leu', 'UUG':'Leu', 'CUU':'Leu', 'CUC':'Leu', 'CUA':'Leu', 'CUG':'Leu', 'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile',  "GUU":'Val', 'GUC':'Val', 'GUA':'Val', 'GUG':'Val', 'UCU':"Ser", 'UCC':"Ser", 'UCA':"Ser", 'UCG':"Ser", "AGU":"Ser", 'AGC':"Ser", 
'CCU':'Pro', 'CCC':'Pro','CCA':'Pro','CCG':'Pro',  'ACU':'Thr', 'ACC':'Thr', 'ACA':'Thr', 'ACG':'Thr', 'GCU':'Ala', 'GCC':'Ala', 'GCA':'Ala', 'GCG':'Ala',  'UAU':"Tyr", 'UAC':"Tyr",  "CAU":'His', 'CAC':'His', 'CAA':'Gln','CAG':'Gln', 'AAU':"Asn", 'AAC':"Asn",  "AAA":"Lys", 'AAG':"Lys", 'GAU':'Asp', 'GAC':'Asp' ,
'GAA':'Glu', 'GAG':'Glu',  'UGU':'Cys', 'UGC':'Cys',  'UGG':"Trp",  'CGU':'Arg', 'CGC':'Arg', 'CGA':'Arg', "CGG":'Arg', 'AGA':'Arg', 'AGG':'Arg', 'GGU':'Gly', 'GGC':'Gly','GGA':'Gly', 'GGG':'Gly', "AUG": "Met", "UAA":"Stp", "UAG":"Stp", "UGA":"Stp"}
stopcodonlist = ['UAA',"UAG", "UGA"]
listofaa = ['Phe', "Leu", "Ile", "Met", "Val", "Ser", "Pro", "Thr", 'Ala', "Tyr", 'His', "Gln", 'Asn', "Lys", "Asp", 'Glu', 'Cys', 'Trp', 'Arg', "Gly" ]
"""
        Description of function: this function will create a random codon e.g.("AAA") with an empty string that 
        concatenates letters from the keys in the minicodon dictionary 
        parameters: None
        return: the randomly generated codon 
"""
def randomcodon(): 
        codon = ''
        for i in range (3): 
            codon += random.choice(list(minicodondict.keys()))
        return codon

"""
        Description of class: This is the segment class that represents each amino acid drawn
        it owns and x and y position as well as a codon and its corresponding anticodon(match)
        the class will also only have one method that draws the codon
        parameters: x and y values for the middle of the square drawn as well as a starting codon
        return: none
"""

class SegmentCODON: 

    def __init__(self, x, y, codon = None): 
        self.x_pos = x
        self.y_pos = y 
        self.codon = codon
        self.match = None
        if codon == None: 
            self.codon = randomcodon()
    """
        Description of function: this is a draw function that will draw the segments of the snake, it will be black
        parameters: none
        return:none
    """
    def draw(self): 
        dudraw.set_pen_color(dudraw.BLACK)
        dudraw.filled_square(self.x_pos + 0.5, self.y_pos + 0.5, 0.5)
        dudraw.set_pen_color(dudraw.WHITE)
        dudraw.line(self.x_pos, self.y_pos+0.5, self.x_pos + 1, self.y_pos +0.5 )
        if self.match == None: 
            dudraw.text(self.x_pos + 0.5, self.y_pos + 0.25, '_ _ _')
        else: 
            dudraw.text(self.x_pos + 0.5, self.y_pos + 0.25, self.match)
        dudraw.text(self.x_pos + 0.5, self.y_pos + 0.7, self.codon )  # Display codon_value as text 
        

class SnakeRNA: 
    """
        Description of function: this is the initializer of the whole snake class
        parameters: none
        return: none
    """
    def __init__(self, minicodondict):
        self.the_snake = []
        self.the_snake.append(SegmentCODON(10,10,'AUG'))  
        self.direction = 'up'
        self.food = []
        self.generate_food()
        self.lives = 5
        self.level = 1
    """
        Description of function: this will allow us to ONLY change the direction the snake is facing 
        parameters: none
        return: the next key typed and direction 
    """
    def generate_food(self): 
        codon_to_match = self.the_snake[0].codon
        invalid_places = []
        for segment in self.the_snake: 
            invalid_places.append((segment.x_pos,segment.y_pos))
        right_codon = ''
        codon = ''

        AAhappens = False
        for i in range(5): 
            if i == 0: 
                AAprobablilty = random.random()
                if AAprobablilty < 0.0:
                    AAhappens = True 
                    right_codon = self.correct_AA(codon_to_match)
                    codon = right_codon
                else:
                    right_codon = self.correct_codon(codon_to_match)
                    codon = right_codon
            else:
                listofrandos = []
                if AAhappens == True: 
                    codon = random.choice(listofaa)
                    while codon == right_codon or codon in listofrandos:
                        codon = random.choice(listofaa)
                    listofrandos.append(codon)
                    

                else:
                    codon = randomcodon()
                    while codon == right_codon: 
                        codon = randomcodon()
                
            codon_x = randint(0,19)
            codon_y = randint(0,19)
            while (codon_x,codon_y) in invalid_places: 
                codon_x = randint(0,19)
                codon_y = randint(0,19)
            
            tRNAfood = tRNA(codon_x, codon_y, codon)
    
            self.food.append(tRNAfood)
            invalid_places.append((codon_x, codon_y))
    


    def change_direction(self): 
        if dudraw.has_next_key_typed():
            key = dudraw.next_key_typed()
            if (key == 'w' or key == 'W') and (self.direction == 'right' or self.direction== 'left'): 
                self.direction = 'up'
            if (key == 'a' or key == "A") and (self.direction == 'up' or self.direction== 'down'): 
                self.direction = 'left'
            if (key == 'S' or key == "s") and (self.direction == 'right' or self.direction== 'left'):
                self.direction  = 'down'
            if (key  == 'd' or  key == 'D') and (self.direction == 'up' or self.direction== 'down'): 
                self.direction = 'right'
    """
        Description of function: this will draw the snake using the draw function in th segment class
        it is in a for loop to draw the entire size of the snake 
        parameters: none
        return:none
    """
    def draw(self):
        dudraw.set_pen_color_rgb(150,75,0)
        dudraw.filled_circle(self.the_snake[0].x_pos+0.5, self.the_snake[0].y_pos+0.5, 0.94)
        for segment in self.the_snake: 
            segment.draw()
        for food in self.food: 
            food.draw()
            
        
        

    """
        Description of function: this function will allow the snake to move depending on the direction
        parameters: none
        return:none
    """
    def move(self): 
        for i in range (len(self.the_snake)-1, 0 , -1):
            self.the_snake[i].x_pos = self.the_snake[i-1].x_pos
            self.the_snake[i].y_pos = self.the_snake[i-1].y_pos
        if self.direction == 'up':
            self.the_snake[0].y_pos += 1
        if self.direction == 'down':
            self.the_snake[0].y_pos -=1
        if self.direction == 'right':
            self.the_snake[0].x_pos +=1
        if self.direction == 'left':
            self.the_snake[0].x_pos -=1 
          
        
        
       
    """
        Description of function: this function allows the game to end when the snake touched or 'eats' it self
        parameters:  none
        return: bool 
    """
    # def eat_self(self): 
    #     for i in range (1,self.the_snake.size):
    #         first_segment = self.the_snake.first()
    #         ith_segment = self.the_snake.get(i)
    #         if first_segment.x_pos == ith_segment.x_pos and first_segment.y_pos == ith_segment.y_pos:
    #             return True
    #     return False
    """
        Description of function: this will add more semgents to the snake when it eats a piece of food 
        in other word the food location is the same location of the head of the snake 
        parameters: none
        return:none
    """
    def eat_food (self):
        head = self.the_snake[0]
        last_segment = self.the_snake[-1]

        correct = self.correct_codon(head.codon)
        

        for food in self.food:
            if (food.x_pos == head.x_pos and food.y_pos == head.y_pos): 
                if food.codon == correct or (head.codon in aminoaciddict and food.codon == self.correct_AA(head.codon)):
                    if food.codon == correct: 
                        head.match = aminoaciddict[head.codon]
                        #or food.codon if he wants it that way around
                    else:
                        head.match = self.correct_AA(head.codon)
                    if self.direction == 'up':
                        self.the_snake.append(SegmentCODON(last_segment.x_pos, last_segment.y_pos-1))
                    if self.direction == 'down':
                        self.the_snake.append(SegmentCODON(last_segment.x_pos, last_segment.y_pos+1))
                    if self.direction == 'right':
                        self.the_snake.append(SegmentCODON(last_segment.x_pos+1, last_segment.y_pos))
                    if self.direction == 'left':
                        self.the_snake.append(SegmentCODON(last_segment.x_pos-1, last_segment.y_pos))
                    
                    
                    
                    self.food = []
                    for i in range(((len(self.the_snake)-1)), -1, -1): 
                        self.the_snake[i].codon = self.the_snake[i-1].codon
                        self.the_snake[i].match = self.the_snake[i-1].match
                        
                    probability = random.random()
                    if probability < 0.3:
                        self.the_snake[0].codon = 'UAA'
                    else: 
                        self.the_snake[0].codon = randomcodon()
                    self.the_snake[0].match = None
                    self.generate_food()

                else:
                    self.food.remove(food)
                    self.lives -=1
                    return False

                if self.the_snake[1].codon in stopcodonlist: 
                    return True
                else: 
                    return False 

                    
                




    def correct_codon(self, codon): 
        right_codon = ''
        for letter in codon: 
            right_codon += minicodondict[letter]
        return right_codon

    def correct_AA(self, codon): 
        return aminoaciddict[codon] 
               

    """
        Description of function: this makes sure that the snake does not go out of bounds 
        and if it hits the wall then the game is over 
        parameters: None
        return:None
    """
    def hit_wall (self): 
        if self.the_snake[0].x_pos > 19 or self.the_snake[0].x_pos < 0 or self.the_snake[0].y_pos > 19 or self.the_snake[0].y_pos<0:
            return True
        return False 
            
         
        
class tRNA: 
    def __init__ (self, x , y, codon): 
        self.x_pos = x
        self.y_pos = y
        self.codon = codon

    """
        Description of function: this will just draw the food. 
        parameters: none
        return:none
    """ 
    def draw(self): 
        #we want it to be random and not in the spots where the snake takes up 
        #you want food to pop up again after it is eaten 
        dudraw.set_pen_color(dudraw.RED)
        dudraw.filled_circle (self.x_pos+0.5, self.y_pos+0.5, 0.5)
        dudraw.set_pen_color(dudraw.WHITE)
        dudraw.text(self.x_pos + 0.5, self.y_pos + 0.5, self.codon )  # Display codon_value as text 
        
    

#main 


dudraw.set_canvas_size(750,750)
dudraw.set_x_scale(0,20)
dudraw.set_y_scale(0,20)

#store the highest score they got 
#show score as theyre playing 
#the snake should not move unitl the play hits a key 



while not dudraw.mouse_clicked():
    dudraw.picture("hello.png", 10, 10)
    dudraw.show(10)


snake_1 = SnakeRNA(minicodondict)
running = True
limit = 60 #number of frames to allow to pass before snake moves
timer = 0  #a timer to keep track of number of frames that passed   
greenflag = False


# import sounddevice as sd
# import soundfile as sf

# filename = "Music/ES_Noc.wav"

# data, fs = sf.read(filename)
# sd.play(data, fs)

while running:
    timer += 1
    if greenflag:
        snake_1.change_direction()

    if not greenflag and dudraw.has_next_key_typed():
        key = dudraw.next_key_typed() 
        key = key.upper()
        if key == 'A' or key == 'W' or key == 'D' or key == 'S':
            greenflag = True 
    if timer == limit:
        timer = 0
        if snake_1.eat_food() == True: 
            limit -= 3
            snake_1.level += 1 

        dudraw.clear()
        if greenflag:
            snake_1.move()
        for row in range(21):
            for column in range (21): 
                if (row + column) % 2 == 0:
                    dudraw.set_pen_color_rgb(204,229,255)  # Light blue
                    # 173, 216, 230
                else:
                    dudraw.set_pen_color_rgb(153,204,255)  # blue
    
                dudraw.filled_square(row+0.5, column+0.5, 0.5)

        dudraw.set_pen_color(dudraw.BLACK)
        dudraw.text(17, 18, "Level: " + str(snake_1.level))
        dudraw.text(17, 17, "chances: " + str(snake_1.lives))
        

        snake_1.draw()
    # if snake_1.eat_self() == True: 
    #     dudraw.text(10,10,'Game Over :(')
    #     dudraw.show(float('inf'))
    if snake_1.hit_wall()== True or snake_1.lives == 0:
        dudraw.set_pen_color(dudraw.RED)
        dudraw.text(10,10,'Game Over :(')
        dudraw.show(float('inf'))
    dudraw.show(5)


    

