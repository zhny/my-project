module.exports = function(row, column) {
	if(typeof column.template=='undefined'){
		return row[column.name];
	}
	return column.template(row);
}