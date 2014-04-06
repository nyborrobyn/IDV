$(document).ready(function() {

        var tests = [];
        var RM = [];
        var BK = [];
        var TT = [];
        var SL = [];
        var FM = [];  
        var OW = [];
        var EM = [];    
        var XX = [];
        var BP = [];
        var DC = [];
        var MB = [];
        var master_matrix = [];
        var new_matrix = [];        
        var exits = [];
            
        var w = window;

        var width = 550;
        var height = 550;
                var svg = d3.select("#chart")
                     .append("svg")
                     .attr("width", width)
                     .attr("height", height)
                     .append("g")
                     .attr("transform","translate(" + width / 2 + "," + height / 2 + ")");

                var range5 = ["#7FCAFF", "#7F97FF", "#A77FFF", "#E77FFF", "#FF9C7E", "#FFBD7E", "#FFD77E", "#CAF562","#62F5C8", "#7FCAFF"];
                var fill = d3.scale.ordinal()
                            .domain(d3.range(range5.length)).range(range5);
                var innerRadius = Math.min(width, height) * .41;
                var outerRadius = innerRadius * 1.05;

        d3.csv("_data/jan12-limited.csv", function (data){
                data.forEach(function(data1){
                    if (data1.Exit != "") {
                    RM.push(+data1.RM);
                    BK.push(+data1.BK);
                    TT.push(+data1.TT);
                    SL.push(+data1.SL);
                    FM.push(+data1.FM);
                    OW.push(+data1.OW);
                    EM.push(+data1.EM);
                    XX.push(+data1.XX);
                    BP.push(+data1.BP);
                    DC.push(+data1.DC);
                    MB.push(+data1.MB); 
                    exits.push(data1.Exit);
                    };  
                });
                master_matrix.push(RM, BK, TT, SL, FM, OW, EM, XX, BP, DC, MB);
                //console.log("Inside ",master_matrix);
                function_loadmatrix(master_matrix);

                data.forEach(function(data2,i){

                    var station = exits[i];
                    //console.log(exits[i]);
                    //console.log(data2);
                    
                    //console.log(data2[station]);
                    //var value = data2[station];
                    //w[station].push(value); 
                    //console.log(w[EP]);   
        //          console.log(data2); 
                });
                
        });

        function function_loadmatrix(m_matrix){
            new_matrix = m_matrix;
            //console.log("m_matrix", m_matrix);
                var chord = d3.layout.chord()
                       .padding(.05)
                       .sortSubgroups(d3.descending)
                       .matrix(m_matrix);

                svg.append("g")
                       .selectAll("path")
                       .data(chord.groups)
                       .enter().append("path")
                       .style("fill", function(d) {
                            return fill(d.index);
                       })
                       .style("stroke", function(d) {
                            return fill(d.index);
                       })
                      .attr("d", d3.svg.arc()
                           .innerRadius(innerRadius)
                           .outerRadius(outerRadius))
                           .on("mouseover", fade(.1))
                           .on("mouseout", fade(1));

                svg.append("g")
                    .attr("class", "chord")
                    .selectAll("path")
                    .data(chord.chords)
                    .enter().append("path")
                    .style("fill", function(d) {
                        return fill(d.target.index);
                    })
                    .attr("d", d3.svg.chord().radius(innerRadius))
                    .style("opacity", 0.5);

                    //console.log(chord);   
             function fade(opacity) {
                    return function(g, i) {
                        svg.selectAll("g.chord path")
                        .filter(function(d) {
                        return d.source.index != i && d.target.index != i;
                        })
                        .transition()
                        .style("opacity", opacity);
    };
};
            var button = d3.select("#chord-transition-button")
            button.on("click", changeChord)
            


            function changeChord() {
                console.log("blah");
            }

        };

        });
