$(document).ready(function() {
    var width = 550;
    var height = 550;
    var svg = null;
    var fill = null;
    var innerRadius = null;
    var outerRadius = null;
    
    initialize();

    function initialize() {
        createSvg();
        createChordDiagram();
        setChordDiagramData(matrix, labels);



    //write all arcs/paths/groups/etc
    //add onclick button method that triggers data transition

        console.log("test")

    }

    //create svg item
    function createSvg() {
        svg = d3.select("#chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform","translate(" + width / 2 + "," + height / 2 + ")");
    }

    // create chord diagram
    function createChordDiagram() {
        var range5 = ["#7FCAFF", "#7F97FF", "#A77FFF", "#E77FFF", "#FF9C7E", "#FFBD7E", "#FFD77E", "#CAF562","#62F5C8", "#7FCAFF"];
        fill = d3.scale.ordinal()
                     .domain(d3.range(range5.length)).range(range5);
        innerRadius = Math.min(width, height) * .41;
        outerRadius = innerRadius * 1.05;
    }

    function getFormattedData(data) {
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
    }

    // set data for chord diagram
    function setChordDiagramData(matrix, labels) {

    }


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


                
        d3.csv("_data/jan12-limited.csv", function (data){
            getFormattedData(data);

            function_loadmatrix(master_matrix, exits);

            data.forEach(function(data2,i){

            var station = exits[i];
                     
                });
                
        });

        function function_loadmatrix(m_matrix, labels){
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
                           .on("mouseout", fade(0.5));

/* Create/update "group" elements */
                        var groupG = svg.selectAll("svg.group")
                            .data(chord.groups(), function (d) {
                                return d.index; 
                                //use a key function in case the 
                                //groups are sorted differently between updates
                            });

                        var newGroups = groupG.enter().append("g")
                            .attr("class", "group");

                    //create the group labels
                        newGroups.append("svg:text")
                        .attr("xlink:href", function (d) {
                                return "#group" + d.index;
                            })
                        .attr("dy", ".35em")
                        .attr("color", "#fff")
                        .text(function (d) {
                                 return labels[d.index];
                        });

                    //position group labels to match layout
                        groupG.select("text")
                        .transition()
                        .duration(1500)
                        .attr("transform", function(d) {
                        d.angle = (d.startAngle + d.endAngle) / 2;
                    //store the midpoint angle in the data object
                
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                            " translate(" + (innerRadius + 26) + ")" + 
                            (d.angle > Math.PI ? " rotate(180)" : " rotate(0)"); 
                    //include the rotate zero so that transforms can be interpolated
                            })
                        .attr("text-anchor", function (d) {
                            return d.angle > Math.PI ? "end" : "begin";
                        });
    

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
