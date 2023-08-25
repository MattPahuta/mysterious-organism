// ********************************************************* //
// *** Codecademy Challenge Project: Mysterious Organism *** //
// ********************************************************* //

// 1 - 2, Helper Functions
// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases (array of 15 dnaBases - A, T, C, or G)
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


// 3 - Factory function 
function pAequorFactory(specimenNum, strandArr) { // pass in a spec num and mockUpStrand()
  return {
    specimenNum,
    strandArr,
    // 4 - Mutate strand
    mutate() {
      const randomIndex = Math.floor(Math.random() * strandArr.length) // get random index
      const targetBaseType = this.strandArr[randomIndex]; // select a base from the strandArr
      console.log(`randomIndex: ${randomIndex}, targetBaseType: ${targetBaseType}`)
      let newBaseType;
      do {
        newBaseType = returnRandBase();
      } while (newBaseType === targetBaseType); // keep cycling until we get a mismatch

      this.strandArr[randomIndex] = newBaseType; // update the targetBaseType to new value
      return this.strandArr;

    },
    // 5 - Compare this.strandArr with another specimen's strandArr
    compareDNA(pAequorObject) {
      // compare this.strandArr with the pAequorObject passed in
      let identicalBases = 0;

      pAequorObject.strandArr.forEach((base, index) => {
        if (base === this.strandArr[index]) {
          identicalBases += 1;
        }
      })
      const identicalPercent = (identicalBases / 15) * 100;
      console.log(`Specimen ${pAequorObject.specimenNum} and specimen ${this.specimenNum} have ${identicalPercent.toFixed(2)}% in common.`)
    },
    // 6 - Determine liklihood of survival
    willLikelySurvive() {
      // check if returned pAequorFactory object has at least 60% 'C' or 'G' bases
      // true or false 
      const countBaseCG = this.strandArr.filter(base => base === 'C' ||  base === 'G').length;
      // get percentage
      const percentage = (countBaseCG / 15) * 100;
      // console.log(percentage)
      return percentage >= 60;
    },
    // 9 - get complementary DNA strand
    complementStrand() {
      const complementaryStrand = [];
      // switch 'A' with 'T' - 'T' with 'A'
      // switch 'C' with 'G' - 'G' with 'C'
      this.strandArr.forEach(base => {
        switch(base) {
          case 'A':
            complementaryStrand.push('T');
            break;
          case 'T':
            complementaryStrand.push('A');
            break;
          case 'C':
            complementaryStrand.push('G')
            break;
          case 'G':
            complementaryStrand.push('C')
            break;
        }
      })
      return complementaryStrand;

    }
  }
}

// *** Get a number of pAequor objects that likely survive, return in array
function getLikelySurvivors(num, startingID) {
  const pAequors = [];
  let id = startingID;
  while (pAequors.length < num) {
    let newSpecimen = pAequorFactory(id, mockUpStrand())

    if (newSpecimen.willLikelySurvive()) {
      pAequors.push(newSpecimen);
      id += 1;
    }
  }
  return pAequors;
} 

const testDNA101 = pAequorFactory(101, mockUpStrand());
const testDNA102 = pAequorFactory(102, mockUpStrand());






