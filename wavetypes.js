					//Rook waves
					old[index] = ( self.friction*( (	
								 cur[lu0+y ]+
					cur[lc+y-1 ] 			 +cur[lc+y+1 ]+
								 cur[ld0+y ]
							 					)/2 - old[index] ) ) | 0;


					//Bishop Waves
					/*
					old[index] = ( self.friction*( (				  
							cur[lu0+y-1]+cur[lu0+y+1]+
							cur[ld0+y-1]+cur[ld0+y+1]
										   						)/2 - old[index] ) ) | 0;
					*/
					//Knight Waves
					/*
					old[index] = ( self.friction*( (				  
								cur[lu1+y-2] + cur[lu1+y+2] + 
							cur[lu0+y-1] + 		cur[lu0+y+1] +
							cur[ld0+y-1] + 		cur[ld0+y+1] +
								cur[ld1+y-2] + cur[lu1+y+2]			)/4 - old[index] ) )| 0;
					*/
					//King Waves
					/*
					old[index] = ( self.friction*( (				  
							cur[lu0+y-1]+cur[lu0+y ]+cur[lu0+y+1]+
							cur[lc+y-1 ] 			 +cur[lc+y+1 ]+
							cur[ld0+y-1]+cur[ld0+y ]+cur[ld0+y+1]
										   						)/4 - old[index] ) ) | 0;
					*/
					//Queen Waves
					/*
					old[index] = ( self.friction*( (	
										  cur[lu1+y ]+
							 cur[lu0+y-1]+cur[lu0+y ]+cur[lu0+y+1]+
				cur[lc+y-2 ]+cur[lc+y-1 ] 			 +cur[lc+y+1 ]+cur[lc+y+2 ]+
							 cur[ld0+y-1]+cur[ld0+y ]+cur[ld0+y+1]+
										  cur[ld1+y ]  						)/6 - old[index] ) ) | 0;
					*/