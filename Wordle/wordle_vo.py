"""
    Description of program
    (Welcome to Wordle! You have six chances to guess the five-letter word.
    A letter G means you got that letter correct and in the right position.
    A letter Y means you matched that letter, but it is in the wrong position.
    A letter B means that letter does not appear in the correct word.)
    Filename: wordle_vo.py 
    Author: Christy Vo
    Date: 01.12.23
    Course: COMP 1352
    Assignment: Project 1 
    Collaborators: None 
    Internet Source:None 
"""



# print (Welcome to Wordle! You have six chances to guess the five-letter word.
# A letter G means you got that letter correct and in the right position.
# A letter Y means you matched that letter, but it is in the wrong position.
# A letter B means that letter does not appear in the correct word.)

#This is code give to hightlight the letters a certain color 
import random
# print with yellow background
def print_yellow(s, end='\n'):
   print('\u001b[43;1m', end='')
   print(s, end=end)
   print('\033[0m', end='')

# print with grey background
def print_grey(s, end='\n'):
   print('\u001b[47;1m', end='')
   print(s, end=end)
   print('\033[0m', end='')

# print with green background
def print_green(s, end='\n'):
   print('\u001b[42;1m', end='')
   print(s, end=end)
   print('\033[0m', end='')

"""
    Description of function: this function makes the file into a giant list 
    parameters: nont
    return: None 
"""
def random_word_gen ()->list: 
    with open('Week_2/usaWords.txt', 'r') as file:
            words = [word.strip() for word in file]
    return (words)
"""
    Description of function: this function runs the entire game 
    parameters: string
    return: None 
"""

def start_game (word: str)-> None:
    running = True
    count = 0 
    while running:
        word_copy = word
        # as count increases everytime the user is asked to interact, if they interact over 6 times 
        #running will be false and the game will end, or they can play again and running would still be true
        if count > 6: 
            answer=input('would you like to play again, press y to keep going?')
            if answer != 'y': 
                running = False
        user_guess = input('Please enter a five letter word:')
        # if the user_guess is not in the given list of words or not 5 letters then the word is not valid 
        while user_guess not in five_letter_words: 
            user_guess = input('that word does not exist or your guess is not 5 letters, try again.')
        count +=1
        # because of checking duplicates you need to make a copy of the chosen word to edit and save
        # the real word to compare 
        # we are iterating 5 times
        for i in range (len(word_copy)):
            # you have to check green first before yellow 
            # if the guess is not in the word at all it will be grey 
            if user_guess[i] not in word_copy:
                print_grey(user_guess[i], end = '')
                # if the guess is in the same spot and the same letter it will 'take out' the letter and add _ and highlight green
            elif  word_copy[i]== user_guess[i]: 
                word_copy = word_copy[:i]+'_'+ word_copy[i+1:]
                print_green(user_guess[i], end = '')
            
            else:
                # everything else is yellow but
                print_yellow(user_guess[i], end = '')
                # we find any duplicates and take them out
                x =word_copy.find(user_guess[i])
                word_copy = word_copy[:x]+'_'+ word_copy[x+1:]
        print()
        if user_guess == word: 
            print(f'You win. You got it in {count} guesses.')
            running = False
                
                    
        

                



#main code block 
words = random_word_gen()
# we will run a list with only 5 letters instead of the whole list 
five_letter_words = [word for word in words if len(word)==5]
right_word = random.choice(five_letter_words)
start_game(right_word)