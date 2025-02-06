/*area of cylinder 
AUTHOR BRIAN SMITH 
Date 3/1/2023
program*/


#include <stdio.h>
#define p1 3.142
int main()
{
int radius,r;
int area;
int lenght,l;
//enter the parameters
printf("enter the radius\n",r);
scanf("%d",&r);
printf("enter the lenght\n",l);
scanf("%d",&l);
area=p1*r*r+p1*r*r*l;
printf("area:%d\n",area);
return 0;
}