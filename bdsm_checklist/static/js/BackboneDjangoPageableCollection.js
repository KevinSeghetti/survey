Backbone.DjangoPageableCollection = Backbone.PageableCollection.extend({

  // Name of the attribute containing the array of records

  state: {
    resultsField      : 'results'      ,
    totalRecordsField : 'count'        ,
    nextField         : 'next'         ,
    previousField     : 'previous'     ,

  },

  parseRecords: function (resp, options) {

    if (resp && _.has(resp, this.state.resultsField) && _.isArray(resp[this.state.resultsField])) {
      return resp[this.state.resultsField];
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


