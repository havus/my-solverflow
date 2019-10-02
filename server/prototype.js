const obj = [
  {
    tags: ['asd', 'qwe', 'zxc']
  },
  {
    tags: ['fgh', 'jkl', 'rty']
  },
  {
    tags: ['uio', 'bnm', 'zxc']
  }
]

const filterObj = obj.filter(el => el.tags.includes('zxc'));

console.log(filterObj);