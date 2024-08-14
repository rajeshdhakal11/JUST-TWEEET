const names = [
    'Rajesh Dhakal',
    'Anukul Banjade',
    'Tom Smith',
    'Michael Johnson',
    'Emily Davis',
    'David Wilson',
    'Sarah Thompson',
    'Robert Anderson',
    'Jessica Taylor',
    'Christopher Brown',
    'Ashley Miller',
  ];
  
  export const randomName = () => {
    return names[Math.floor(Math.random() * names.length)];
  };