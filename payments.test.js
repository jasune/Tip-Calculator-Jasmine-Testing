describe('Payment Form', () => {
  let billAmtInput, tipAmtInput, paymentForm;

  beforeEach(() => {
    billAmtInput = document.createElement('input');
    billAmtInput.id = 'billAmt';
    tipAmtInput = document.createElement('input');
    tipAmtInput.id = 'tipAmt';
    paymentForm = document.createElement('form');
    paymentForm.id = 'paymentForm';
    paymentForm.append(billAmtInput, tipAmtInput);
    document.body.append(paymentForm);
  });

  afterEach(() => {
    billAmtInput.remove();
    tipAmtInput.remove();
    paymentForm.remove();
  });

  it('should create a payment object and update allPayments', () => {
    billAmtInput.value = '10';
    tipAmtInput.value = '2';
    const submitEvt = new Event('submit');
    paymentForm.dispatchEvent(submitEvt);
    expect(Object.keys(allPayments).length).toEqual(1);
    expect(allPayments['payment1']).toEqual({
      billAmt: '10',
      tipAmt: '2',
      tipPercent: 20
    });
  });

  it('should not create a payment object for negative or empty inputs', () => {
    billAmtInput.value = '';
    tipAmtInput.value = '';
    const submitEvt = new Event('submit');
    paymentForm.dispatchEvent(submitEvt);
    expect(Object.keys(allPayments).length).toEqual(0);

    billAmtInput.value = '-10';
    tipAmtInput.value = '-2';
    paymentForm.dispatchEvent(submitEvt);
    expect(Object.keys(allPayments).length).toEqual(0);
  });
});

describe('Payment Table', () => {
  let paymentTbody;

  beforeEach(() => {
    paymentTbody = document.createElement('tbody');
    const paymentTable = document.createElement('table');
    paymentTable.id = 'paymentTable';
    paymentTable.append(paymentTbody);
    document.body.append(paymentTable);
  });

  afterEach(() => {
    paymentTbody.parentNode.parentNode.removeChild(paymentTbody.parentNode);
  });

  it('should append a new payment to the table', () => {
    const curPayment = {
      billAmt: '10',
      tipAmt: '2',
      tipPercent: 20
    };
    appendPaymentTable(curPayment);
    expect(paymentTbody.querySelector('tr')).not.toBeNull();
  });

  it('should update the summary table when a new payment is added', () => {
    const curPayment = {
      billAmt: '10',
      tipAmt: '2',
      tipPercent: 20
    };
    allPayments = { payment1: curPayment };
    updateSummary();
    const summaryTds = document.querySelectorAll('#summaryTable tbody tr td');
    expect(summaryTds[0].innerText).toEqual('$10');
    expect(summaryTds[1].innerText).toEqual('$2');
    expect(summaryTds[2].innerText).toEqual('20%');
  });
});