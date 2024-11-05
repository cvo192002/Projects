exe: dumalloc.o mallocTestVersion4.o
	gcc dumalloc.o mallocTestVersion4.o -o exe

dumalloc.o: dumalloc.c mallocTestVersion4.h
	gcc malloc.c -c

mallocTestVersion1.o: dumalloc.c mallocTestVersion4.h
	gcc test.c -c

clean:
	rm -f *.o
	rm -f exe