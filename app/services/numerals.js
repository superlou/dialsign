import Ember from 'ember';

export default Ember.Service.extend({
  romanize: function(num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  },

  numerize: function(i, format) {
    var parts = format.split('-');
    var numeral_type = parts[0]
    var numeral_max = parts[1]
    var numeral_increment = parts[2] || 1

    if (i == 0) {
      i = numeral_max;
    } else {
      i = i * numeral_increment;
    }

    if (numeral_type == "1") {
      return i.toString();
    } else if (numeral_type == "I") {
      return this.romanize(i);
    }
  }
});
