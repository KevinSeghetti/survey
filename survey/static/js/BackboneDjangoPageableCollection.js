Backbone.DjangoPageableCollection = Backbone.PageableCollection.extend({

  // Name of the attribute containing the array of records

  state: {
    resultsField      : 'results'      ,
    totalRecordsField : 'count'        ,
    nextField         : 'next'         ,
    previousField     : 'previous'     ,

  },

  parseRecords: function (resp, options) {

    var fields = ['question_text', 'question_detail']
    if (resp && _.has(resp, this.state.resultsField) && _.isArray(resp[this.state.resultsField])) {

      var records = resp[this.state.resultsField]

      for (var i = 0; i < records.length; i++) {
        var record = records[i]
        if (record.question) {
           for (var index in fields) {
             var key = fields[index]
             if (record.question.hasOwnProperty(key)) {
               record[key] = record.question[key]
             }
           }
        }
      }
      return records
    } else {
      return Backbone.PageableCollection.prototype.parseRecords.apply(this, arguments);
    }
  },


  parseState: function (resp, queryParams, state, options) {
    return state =
      {totalRecords: resp[this.state.totalRecordsField]};
  },

  parseLinks: function (resp, options) {
    let links;
    return links = {
      prev: resp[this.state.previousField],
      next: resp[this.state.nextField],
      first: null
    }
  },
})


