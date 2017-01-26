
					    /*
					    //Rook waves
						newval = ( (
									self.oT[x  ][y+1] +
							self.oT[x-1][y  ] 	+ self.oT[x+1][y  ] +
									self.oT[x  ][y-1]				)/2 - self.ooT[x][y] ) | 0;
						*/

						//Bishop waves
						newval = ( (
						self.oT[x-1][y+1] + self.oT[x+1][y+1] +
						self.oT[x-1][y-1] + self.oT[x+1][y-1])/2 - self.ooT[x][y] ) | 0;

						/*
						//King Waves
						newval = ( (
						self.oT[x-1][y+1] + self.oT[x  ][y+1] + self.oT[x+1][y+1] +
						self.oT[x-1][y  ] 					  + self.oT[x+1][y  ] +
						self.oT[x-1][y-1] + self.oT[x  ][y-1] + self.oT[x+1][y-1]	)/4 - self.ooT[x][y] ) | 0;
						*/

						/*
						//Queen Waves
						newval = ( (		self.oT[x  ][y+2] + 
						self.oT[x-1][y+1] + self.oT[x  ][y+1] + self.oT[x+1][y+1] +
	self.oT[x-2][y  ] +	self.oT[x-1][y  ] 					  + self.oT[x+1][y  ] + self.oT[x+2][y  ] +
						self.oT[x-1][y-1] + self.oT[x  ][y-1] + self.oT[x+1][y-1] +
											self.oT[x  ][y-2]						)/6 - self.ooT[x][y] ) | 0;
						*/
						/*
						//Knight Waves
						newval =((	self.oT[x-1][y+2] + self.oT[x+1][y+2] + 
								self.oT[x-2][y+1] + 		self.oT[x+2][y+1] +
								self.oT[x-2][y-1] + 		self.oT[x+2][y-1] +
									self.oT[x-1][y-2] + self.oT[x+1][y-2]			)/4 - self.ooT[x][y] ) | 0;
						*/