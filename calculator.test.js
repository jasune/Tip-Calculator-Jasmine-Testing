
describe("getCurrentUIValues()", function() {
  it("should return an object with three properties", function() {
    const values = getCurrentUIValues();
    expect(values).toEqual(jasmine.any(Object));
    expect(values).toEqual(jasmine.objectContaining({
      amount: jasmine.any(Number),
      years: jasmine.any(Number),
      rate: jasmine.any(Number)
    }));
  });
});

describe("setupIntialValues()", function() {
  it("should set default values in the inputs and call update()", function() {
    spyOn(window, "update");
    setupIntialValues();
    expect(document.getElementById("loan-amount").value).toEqual("10000");
    expect(document.getElementById("loan-years").value).toEqual("10");
    expect(document.getElementById("loan-rate").value).toEqual("4.5");
    expect(window.update).toHaveBeenCalled();
  });
});

describe("update()", function() {
  it("should call updateMonthly() with the result of calculateMonthlyPayment()", function() {
    spyOn(window, "updateMonthly");
    update();
    expect(window.updateMonthly).toHaveBeenCalledWith(jasmine.any(String));
  });
});

describe("calculateMonthlyPayment()", function() {
  it("should return a string with two decimal places", function() {
    const values = {amount: 10000, years: 10, rate: 4.5};
    const monthlyPayment = calculateMonthlyPayment(values);
    expect(monthlyPayment).toEqual(jasmine.any(String));
    expect(monthlyPayment).toMatch(/^\d+\.\d{2}$/);
  });
});

describe("updateMonthly()", function() {
  it("should update the text of the monthly-payment element", function() {
    document.body.innerHTML = '<div id="monthly-payment"></div>';
    updateMonthly("100.00");
    expect(document.getElementById("monthly-payment").textContent).toEqual("$100.00");
  });
});