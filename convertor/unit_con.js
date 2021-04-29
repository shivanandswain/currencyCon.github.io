
var property = new Array();
var unit = new Array();
var factor = new Array();

property[0] = "Acceleration";
unit[0] = new Array("Meter/sq.sec (m/sec^2)", "Foot/sq.sec (ft/sec^2)", "Inch/sq.sec (in/sec^2)");
factor[0] = new Array(1, .3048, 2.54E-02);

property[1] = "Area";
unit[1] = new Array("Square meter (m^2)", "Acre (acre)", "Hectare", "Square centimeter", "Square kilometer", "Square foot (ft^2)", "Square inch (in^2)");
factor[1] = new Array(1, 4046.856, 10000, .0001, 1000000, 9.290304E-02, 6.4516E-04);

property[2] = "Electricity";
unit[2] = new Array("Coulomb (Cb)", "Ampere hour (A hr)", "Faraday (F)");
factor[2] = new Array(1, 3600, 96521.8999999997);

property[3] = "Force";
unit[3] = new Array("Newton (N)", "Dyne (dy)", "Kilogram force (kgf)");
factor[3] = new Array(1, .00001, 9.806650);

property[4] = "Force / Length";
unit[4] = new Array("Newton/meter (N/m)");
factor[4] = new Array(1);

property[5] = "Length";
unit[5] = new Array("Meter (m)", "Centimeter (cm)", "Kilometer (km)", "Foot (ft)", "Inch (in)",  "Micrometer (mu-m)",  "Millimeter (mm)");
factor[5] = new Array(1, .01, 1000, .3048, .0254, .000001, .001);

property[6] = "Mass";
unit[6] = new Array("Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)", "Ton (metric)", "Tonne");
factor[6] = new Array(1, .001, 1e-6, .000000001,  1000, 1000);

property[7] = "Mass Flow";
unit[7] = new Array("Kilogram/second (kgr/sec)");
factor[7] = new Array(1);

property[8] = "Density & Mass capacity";
unit[8] = new Array("Kilogram/cub.meter", "Grams/cm^3 (gr/cc)");
factor[8] = new Array(1, 1000);

property[9] = "Power";
unit[9] = new Array("Watt (W)", "Kilowatt (kW)", "Megawatt (MW)", "Milliwatt (mW)");
factor[9] = new Array(1, 1000, 1000000, .001, );

property[10] = "Temperature";
unit[10] = new Array("Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)");
factor[10] = new Array(1, 0.555555555555, 1);
tempIncrement = new Array(0, -32, -273.15);

property[11] = "Time";
unit[11] = new Array("Second (sec)", "Hour (mean solar)", "Minute (mean solar)", "Year (calendar)");
factor[11] = new Array(1, 3600, 60, 31536000);

property[12] = "Velocity & Speed";
unit[12] = new Array("Meter/second (m/sec)", "Kilometer/hour (kph)", "Knot (int'l)");
factor[12] = new Array(1, .2777779, .5144444);

function UpdateUnitMenu(propMenu, unitMenu) {
  var i;
  i = propMenu.selectedIndex;
  FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}

function CalculateUnit(sourceForm, targetForm) {
  var sourceValue = sourceForm.unit_input.value;

  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {
    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {
  var propIndex;
  var sourceIndex;
  var sourceFactor;
  var targetIndex;
  var targetFactor;
  var result;

  propIndex = document.property_form.the_menu.selectedIndex;

  sourceIndex = sourceForm.unit_menu.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];

  targetIndex = targetForm.unit_menu.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];


  result = sourceForm.unit_input.value;
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) + tempIncrement[sourceIndex];
  }
  result = result * sourceFactor;
  result = result / targetFactor;
  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) - tempIncrement[targetIndex];
  }

  targetForm.unit_input.value = result;
}

window.onload = function(e) {
  FillMenuWithArray(document.property_form.the_menu, property);
  UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
  UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu)
}

document.getElementByClass('numbersonly').addEventListener('keydown', function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
      (key == 65 && (e.ctrlKey || e.metaKey)) || // Select All 
      (key == 67 && (e.ctrlKey || e.metaKey)) || // Copy
      (key == 86 && (e.ctrlKey || e.metaKey)) || // Paste
      (key >= 35 && key <= 40) || // End, Home, Arrows
      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || // Numeric Keys
      (key >= 96 && key <= 105) // Numpad
      (key == 190) // Numpad
    )) e.preventDefault();
});