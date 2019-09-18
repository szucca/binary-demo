
const OFF_COLOR = "lightgray";
const ON_COLOR = "indigo";

const SIZE = 40;

window.onload = function() {
  
  register.initRegister();
  
  buttonMaker("showBinary", "Binary", "binary");
  buttonMaker("showOctal", "Octal", "octal");
  buttonMaker( "showDecimal", "Decimal", "decimal" );
  buttonMaker( "showHexadecimal", "Hexadecimal", "hexadecimal" );

  // handle clicks for the Clear Bits button
  document.getElementById("clearBits").onclick = function() {
    register.clearBits();
  }
  
  // handle clicks for the Show/Hide Bit Values button
  document.getElementById("showBits").onclick = function() {
    
    let turnOff = (this.innerHTML === "Show Bit Values") ? true : false;
    register.toggleShowBits();
    
    // set the text in each bit
    register.setText();
    
    // change the button
    if (turnOff) {
      this.innerHTML = "Hide Bit Values"
    } else {
      this.innerHTML = "Show Bit Values"
    }
  }
  
  // clicks on Bits will bubble to the register
  document.getElementById("register").onclick = function() {
      let n = register.calculateValue();
      register.updateValue(n);
    }
    
}

let register = {
  
  bitCount: 8,
  bits: [],
  showBits: true,
  
  initRegister: function() {
    // create the Bit objects and store them
    for(let i=0; i<this.bitCount; i++) {
      this.bits.push(new Bit(i));
    }
  },

  setText: function() {
    let n;
    for(let i=0; i<this.bitCount; i++) {
      n = this.bits[i].getValue();
      if(this.showBits) {
        this.bits[i].setText(n);
      } else {
        this.bits[i].setText("");
      }
    }
  },
  
  toggleShowBits: function()
  {
    this.showBits = !this.showBits;
  },
  
  setShowBits: function(bValue) {
    this.showBits = bValue;
  },
  
  getShowBits: function() {
    return showBits;
  },
  
  clearBits: function(elem) {
    
    for(let i=0; i<this.bitCount; i++) {
      this.bits[i].turnOff();
    }
    
    this.updateValue(0);
  },
  
  calculateValue: function() {
    let n = 0;
    for(let i=0; i<this.bitCount; i++) {
      if (this.bits[i].getState()) {
        n += Math.pow(2, i);
      }
    }
    return n;
  }, 
  
  updateValue: function(n) {
    
    let bStr = "00000000" + n.toString(2);  // pad the string
    bStr = bStr.substr(bStr.length - 8);     // keep the last 8 bits
    document.getElementById("binaryValue").innerHTML = "0b" + bStr;
    
    let oStr = n.toString(8);
    
    document.getElementById("octalValue").innerHTML = "0" + oStr;
    
    let dStr = n.toString();
    document.getElementById("decimalValue").innerHTML = dStr;
    
    let hStr = "00" + n.toString(16);  // pad the string
    hStr = hStr.substr(hStr.length - 2);     // keep the last 4 bits
    document.getElementById("hexadecimalValue").innerHTML = "0x" + hStr;
  }
}

function Bit(id) {
    this.id = id;
    this.elem = document.getElementById("b" + id);
    this.state = false;
    this.value = Math.pow(2, id);
    
    let bit = this;
    
    this.setText = function(txt) {
      this.elem.innerHTML = txt;
    }
    
    this.getState = function() {
      return this.state;
    }
    
    this.getValue = function() {
      return this.value;
    }
    
    this.turnOff = function() {
      this.state = false;
      this.elem.style.backgroundColor = OFF_COLOR;
      this.elem.style.color = ON_COLOR;
    }
    
    this.turnOn = function() {
      this.state = true;
      this.elem.style.backgroundColor = ON_COLOR;
      this.elem.style.color = OFF_COLOR;
    }
    
    this.elem.onclick = function() {
      if( bit.state ) {
        bit.turnOff();
      } else {
        bit.turnOn();
      }
    }
    
    // set the initial state
    this.turnOff();
    
}

function buttonMaker(elemId, label, targetId ) {
  // these are made once, when the button maker is called
  let elem = document.getElementById(elemId);
  let target = document.getElementById(targetId);
  let onText = "Show " + label;
  let offText = "Hide " + label;
  
  // variables declared in the function have local scope
  elem.onclick = function() {
    let currText = elem.innerHTML;
    if (currText === offText) {
      elem.innerHTML = onText;
      target.style.display = "none";
    } else {
      elem.innerHTML = offText;
      target.style.display = "table-row";
    }
  }

}
