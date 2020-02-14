javascript:{
  document.querySelector('center>table:nth-of-type(3)').id = 'gradeTable';
  document.querySelector('center>table:nth-of-type(4)').id = 'GPATable';
  document.querySelector('center>table:nth-of-type(5)').id = 'uniAggrTable';
  document.querySelector('center>table:nth-of-type(6)').id = 'grdAggrTable';
  
  let cat_uni = {};
  for (c_tr of gradeTable.querySelectorAll(':scope>tbody>tr:not(:first-of-type)')) {
    let cat = c_tr.firstElementChild.textContent;
    cat_uni[cat] = 0;
    for (s_tr of c_tr.querySelectorAll('table tr')) {
      let grade_td = s_tr.querySelector('td:nth-of-type(2)');
      let grade = grade_td.textContent;
      if (/(履修中)|(保　留)/.test(grade)) continue;
      if (/(　[Ａ-ＤＳ])|(欠　席)/.test(grade)) grade_td.textContent = '　Ｓ';
      let unit = Number(s_tr.querySelector('td:nth-of-type(3)').textContent);
      cat_uni[cat] += unit;
    }
  }
  
  for (gpa of GPATable.querySelectorAll('table table tr>td:last-of-type'))
    if (/\S+/.test(gpa.textContent)) gpa.textContent = '4.00';
  
  let sum = 0;
  let sum_sum = 0;
  for (tr of uniAggrTable.querySelectorAll('tr:not(:first-of-type)')) {
    let cat = tr.querySelector('td:first-of-type');
    if (!cat.align) {
      cat.nextElementSibling.textContent = cat_uni[cat.textContent];
      sum += cat_uni[cat.textContent];
    } else {
      cat.nextElementSibling.textContent = sum;
      sum_sum += sum;
      sum = 0;
    }
  }
  uniAggrTable.querySelector('tr:last-of-type>td:nth-of-type(2)').textContent = sum_sum;

  let bs = grdAggrTable.querySelectorAll('tr>td:nth-of-type(2)>b');
  bs[0].textContent = sum_sum;
  bs[1].textContent = 0;
  bs[2].textContent = 0;
}
