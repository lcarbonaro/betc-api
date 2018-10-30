<<<<<<< HEAD
var request = require('request');

module.exports = function(req, res, next) {
  var id = req.query.id,
    sheet = req.query.sheet || 1,
    query = req.query.q || '',
    useIntegers = req.query.integers || true,
    showRows = req.query.rows || true,
    showColumns = req.query.columns || true,
    url = 'https://spreadsheets.google.com/feeds/list/' + id + '/' + sheet + '/public/values?alt=json',
    month = req.query.month || '',
    next = parseInt(req.query.next) || 0;

  request(url, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var data = JSON.parse(response.body);
      var responseObj = {};
      var rows = [];
      var columns = {};
      for(var i = 0; i < data.feed.entry.length; i++) {
        var entry = data.feed.entry[i];
        var keys = Object.keys(entry);
        var newRow = {};
        var queried = false;
        for(var j = 0; j < keys.length; j++) {
          var gsxCheck = keys[j].indexOf('gsx$');
          if(gsxCheck > -1) {
            var key = keys[j];
            var name = key.substring(4);
            var content = entry[key];
            var value = content.$t;
            if(value.toLowerCase().indexOf(query.toLowerCase()) > -1) {              
              queried = true;
            }
            if(useIntegers === true && !isNaN(value)) {
              value = Number(value);
            }
            newRow[name] = value;
            if(queried === true) {
              if(!columns.hasOwnProperty(name)) {
                columns[name] = [];
                columns[name].push(value);
              } else {
                columns[name].push(value);
              }
            }
          }
        }
        if(queried === true) {
          rows.push(newRow);
        }
      }
      if(showColumns === true) {
        responseObj['columns'] = columns;
      }
      if(showRows === true) {
        responseObj['rows'] = rows;
      }

      // sort first
      responseObj['rows'] = responseObj.rows.sort(  (r1,r2) => {
        return (r1.mthnum + r1.day < r2.mthnum + r2.day) ? -1 : 1;
      });


      if(month !== '') {

        responseObj['rows'] = responseObj.rows.filter( r => r.month.toLowerCase() === month.toLowerCase());

      }

      if(next !== 0) {
        
        // return first n rows >= today
        let today = getCurrentMMDD();
        //console.log(today);
        
        let nextRows = responseObj.rows.filter( r => r.mthnum + r.day > today );

        nextRows = nextRows.slice(0, next);

        let ni = 0;
        while(nextRows.length<next) {
          nextRows.push( responseObj.rows.slice(ni, ni+1)[0]  );
          ni++;
        }

        responseObj['rows'] = nextRows;

      }


      return res.status(200).json(responseObj);
    } else {
      return res.status(response.statusCode).json(error);
    }
  });
};

function getCurrentMMDD() {
  let n = new Date();
  let d = n.getDate();
  d = (d<=9) ? '0' + d : '' + d;
  let m = n.getMonth() + 1;
  m = (m<=9) ? '0' + m : '' + m;
  return m+d;
}
=======
var request = require('request');

module.exports = function(req, res, next) {
  var id = req.query.id,
    sheet = req.query.sheet || 1,
    query = req.query.q || '',
    useIntegers = req.query.integers || true,
    showRows = req.query.rows || true,
    showColumns = req.query.columns || true,
    url = 'https://spreadsheets.google.com/feeds/list/' + id + '/' + sheet + '/public/values?alt=json',
    month = req.query.month || '',
    next = parseInt(req.query.next) || 0;

  request(url, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      var data = JSON.parse(response.body);
      var responseObj = {};
      var rows = [];
      var columns = {};
      for(var i = 0; i < data.feed.entry.length; i++) {
        var entry = data.feed.entry[i];
        var keys = Object.keys(entry);
        var newRow = {};
        var queried = false;
        for(var j = 0; j < keys.length; j++) {
          var gsxCheck = keys[j].indexOf('gsx$');
          if(gsxCheck > -1) {
            var key = keys[j];
            var name = key.substring(4);
            var content = entry[key];
            var value = content.$t;
            if(value.toLowerCase().indexOf(query.toLowerCase()) > -1) {              
              queried = true;
            }
            if(useIntegers === true && !isNaN(value)) {
              value = Number(value);
            }
            newRow[name] = value;
            if(queried === true) {
              if(!columns.hasOwnProperty(name)) {
                columns[name] = [];
                columns[name].push(value);
              } else {
                columns[name].push(value);
              }
            }
          }
        }
        if(queried === true) {
          rows.push(newRow);
        }
      }
      if(showColumns === true) {
        responseObj['columns'] = columns;
      }
      if(showRows === true) {
        responseObj['rows'] = rows;
      }

      // sort first
      responseObj['rows'] = responseObj.rows.sort(  (r1,r2) => {
        return (r1.mthnum + r1.day < r2.mthnum + r2.day) ? -1 : 1;
      });


      if(month !== '') {

        responseObj['rows'] = responseObj.rows.filter( r => r.month.toLowerCase() === month.toLowerCase());

      }

      if(next !== 0) {
        
        // return first n rows >= today
        let today = getCurrentMMDD();
        //console.log(today);
        
        let nextRows = responseObj.rows.filter( r => r.mthnum + r.day > today );

        nextRows = nextRows.slice(0, next);

        let ni = 0;
        while(nextRows.length<next) {
          nextRows.push( responseObj.rows.slice(ni, ni+1)[0]  );
          ni++;
        }

        responseObj['rows'] = nextRows;

      }


      return res.status(200).json(responseObj);
    } else {
      return res.status(response.statusCode).json(error);
    }
  });
};

function getCurrentMMDD() {
  let n = new Date();
  let d = n.getDate();
  d = (d<=9) ? '0' + d : '' + d;
  let m = n.getMonth() + 1;
  m = (m<=9) ? '0' + m : '' + m;
  return m+d;
}
>>>>>>> ecc735ae5c56151d84fe645f92409546b290d0ac
