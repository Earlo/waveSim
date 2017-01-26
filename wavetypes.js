
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
						old[index] = ( (	cur[lu1+y ]  +
							cur[lu0+y-1] + 	cur[lu0+y ]  + cur[lu0+y+1] +
			cur[lc+y-2 ] + 	cur[lc+y-1 ] 				 + cur[lc+y+1 ] + cur[lc+y+2 ] +
							cur[ld0+y-1] + 	cur[ld0+y ]  + cur[ld0+y+1] +
											cur[ld1+y ]  						)/6 - old[index] ) | 0;
						*/
						/*
						//Knight Waves
						newval =((	self.oT[x-1][y+2] + self.oT[x+1][y+2] + 
								self.oT[x-2][y+1] + 		self.oT[x+2][y+1] +
								self.oT[x-2][y-1] + 		self.oT[x+2][y-1] +
									self.oT[x-1][y-2] + self.oT[x+1][y-2]			)/4 - self.ooT[x][y] ) | 0;
						*/