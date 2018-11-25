﻿#include <stdio.h>

/*
浮点数:

|<-- 符号位 s (1 bit) -->|<-- 整数 exp (8 bit) -->|<-- 小数位 .xxx (23 bit) -->|

	(-1)^s * 1.xxx * 2 ^ (exp - 127)

*/

int main(void)
{
	int i = 5;
	float f = i;
	
	/* 
	5 => 5.0 => 1.25 x 2^2 => 1.25 x 2^(129 - 127)
	0 10000001 01000000000000000000000
	*/
	printf("%f\n", f);
	
	short s = *(short *)&f;
	printf("%d\n", s);

	return 0; 
}