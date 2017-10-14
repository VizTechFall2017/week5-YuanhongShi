var svg = d3.select('svg');
var defs = svg.append('defs');

defs.append('pattern')
    .attr('id','bg')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 1250)
    .attr('height', 700)
    .append('image')
    .attr('xlink:href', 'Background_Single.png')
    .attr('width', 1250)
    .attr('height', 700)
    .attr('x', 0)
    .attr('y', 0);



svg.append('rect')
    .attr('width', 1250)
    .attr('height', 700)
    .attr('fill', 'url(#bg)');

//define the line function
var lineFunction = d3.line()
    //.interpolate('cardinal')
    .x(function(d){
        return d.x;
    })
    .y(function(d){
        return d.y;
    });

var currentColor = 'black';
var allData;
var dataColor;


d3.csv('./PathData.csv', function(dataIn){
    allData = dataIn;
    dataColor = allData.filter(function(d){
        return d.fill == 'black';
    });

//add single path to the dots
    var path = svg.append('path')
        .datum(dataIn)
        .attr('class', 'line')
        .attr('stroke','steelblue')
        .attr('stroke-width', 3)
        .attr('d', lineFunction)
        .attr('fill', 'none');


//draw the dots on the different positions
    /*svg.selectAll('circle')
        .data(dataIn)
        .enter()
        .append('circle')
        .attr('cx', function(d){
            return d.x;
        })
        .attr('cy', function(d){
            return d.y;
        })
        .attr('r', function(d){
            return d.r;
        })
        .attr('fill', function(d){
            //console.log(d.fill);
            return d.fill;

        });*/
    svg.selectAll('circle')
        .data(dataColor)
        .enter()
        .append('circle')
        .attr('class','myCircles');

    updateData(dataColor);


});


function buttonClicked(){
    if (currentColor === 'black'){
        dataColor = allData.filter(function(d){
            console.log(dataColor);
            return d.fill == 'gray';

        });
        updateData(dataColor);
        currentColor = 'gray';
    }
    else{
        dataColor = allData.filter(function(d){
            return d.fill == 'black';

        });
        updateData(dataColor);
        currentColor = 'black';
    }

}

function updateData(dataPoints) {

    console.log(dataPoints);
    svg.selectAll('.myCircles')
        .data(dataPoints)
        .attr('cx',function(d){
            return d.x;
        })
        .attr('cy', function(d){
            return d.y;
        })
        .attr('r', function(d){
            return d.r * Math.random() * 1.5;
        })
        .attr('fill', function(d){
            return d.fill;
        })

}



