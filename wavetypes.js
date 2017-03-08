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


	function rook(){
		//Rook waves
		old[ctr] = (friction*( ( (	
					cur[lu0] +
			cur[ctr-1] + cur[ctr+1] +
					cur[ld0]			) >> 1 ) - old[ctr] ) ) |0;
	}

	function bishop(){
		//Bishop Waves
		old[ctr] = ( friction*( ( (
				cur[lu0-1] + cur[lu0+1] +
				cur[ld0-1] + cur[ld0+1]		) >> 1 ) - old[ctr] ) ) |0;
	}

	function knight(){
		//Knight Waves
		old[ctr] = ( friction*( ( (
				cur[lu1-2] + cur[lu1+2] + 
			cur[lu0-1] + 		cur[lu0+1] +
			cur[ld0-1] + 		cur[ld0+1] +
				cur[ld1-2] + cur[ld1+2]		) >> 2 ) - old[ctr] ) ) |0;
	}

	function king(){
		//King Waves
		old[ctr] = ( friction*( ( (
			cur[lu0-1] + cur[lu0] + cur[lu0+1] +
			cur[ctr-1] + 			cur[ctr+1] +
			cur[ld0-1] + cur[ld0] + cur[ld0+1]  ) >> 2 ) - old[ctr] ) ) |0;
	}

	}
	function custom(){
		//custom
		old[ctr] = ( friction*( ( (
		cur[lu1-2]*ca[0 ] + cur[lu1-1]*ca[1 ] + cur[lu1]*ca[2 ] + cur[lu1+1]*ca[3 ] + cur[lu1+2]*ca[4 ] +
		cur[lu0-2]*ca[5 ] + cur[lu0-1]*ca[6 ] + cur[lu0]*ca[7 ] + cur[lu0+1]*ca[8 ] + cur[lu0+2]*ca[9 ] +
		cur[ctr-2]*ca[10] + cur[ctr-1]*ca[11] + 				  cur[ctr+1]*ca[13] + cur[ctr+2]*ca[14] +
		cur[ld0-2]*ca[15] + cur[ld0-1]*ca[16] + cur[ld0]*ca[17] + cur[ld0+1]*ca[18] + cur[ld0+2]*ca[19] +
		cur[ld1-2]*ca[20] + cur[ld1-1]*ca[21] + cur[ld1]*ca[22] + cur[ld1+1]*ca[23] + cur[ld1+2]*ca[24]  
																		) >> 2 ) - old[ctr] ) ) |0;
	}
	function box(){
		//box
		old[ctr] = ( friction*( ( (
		cur[lu1-2] + cur[lu1-1] + cur[lu1] + cur[lu1+1] + cur[lu1+2] +
		cur[lu0-2] + cur[lu0-1] + cur[lu0] + cur[lu0+1] + cur[lu0+2] +
		cur[ctr-2] + cur[ctr-1] + 			 cur[ctr+1] + cur[ctr+2] +
		cur[ld0-2] + cur[ld0-1] + cur[ld0] + cur[ld0+1] + cur[ld0+2] +
		cur[ld1-2] + cur[ld1-1] + cur[ld1] + cur[ld1+1] + cur[ld1+2]  
																		) >> 2 ) - old[ctr] ) ) |0;
	}

