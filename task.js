const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

function findEmployeeByName(person, arr){
  return arr.filter((element)=>{return element['name']===person}).shift(0)
}
//[pk] great! two notes:
//[pk] 1. "x => {return z}" can be shortened to "x => z". no curly braces means "return".
//[pk] 2. "find" (instead of filter) will just return the first element that meets the criteria-- saves you the ".shift(0)"

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }

spacer('')

function findManagerFor(personObj, arr){
  let manager = personObj['managerId']
  return arr.filter((element)=>{return element['id']===manager}).shift(0)
}
//[pk] great! see above.

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

function findCoworkersFor(personObj,arr){
let manager = personObj['managerId']
return arr.filter((element)=>{return element['managerId']===manager&&element['id']!==personObj['id']})
}
//[pk] great!

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

function findManagementChainForEmployee(personObj,arr){
  let person = personObj
  let returnArr=[]
  do{
    let manager = findManagerFor(person,arr)
    if (typeof manager==='undefined'){
      break
    //[pk] doesn't the while loop handle the breaking for you?
    }else{
      returnArr.unshift(manager)
      person=manager
    }
  }
  while(typeof person !=='undefined')
  return returnArr
}
//[pk] good!


spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//recursion
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));

function generateManagementTree(arr){
  arr[0]['reports']=findReports(arr[0],arr)
    return arr[0]
}
//[pk] good but cheating by IDing the manager as "arr[0]". what if you weren't guaranteed that the array's 0th element is the manager?
//[pk] you can find manager by lack of managerId

function findReports(personObj,arr){
      let id = personObj['id']
      return arr.filter((element)=>{
        return element['managerId']===id
      }).map((elem)=>{
        elem['reports']=findReports(elem,arr)
        return elem
      })
    }
//[pk] funky use of map. but it works!

/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
let i=0
function displayManagementTree(obj){
    console.log("-".repeat(i)+obj['name'])
    i+=1
    if(obj['reports']!==[]){
      obj['reports'].reduce((acc,elem)=>{
        displayManagementTree(elem)
      },i)
    }
    i=1
    
}
//[pk] very good!
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
