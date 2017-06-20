/*jshint esversion: 6*/

class UIManager {
    constructor(renderer) {
        // Define the div for the tooltip
        this.renderer = renderer;
        this.buttonClicked = 0;
        let UI = this;
        this.tip = renderer.root.append("div")	
            .attr("class", "tooltip")	
            .style("font-size", "3em")			
            .style("opacity", 0)
            .style("padding", "0.5em")
            .style("text-align", "center")  ;

        this.stateToggle = renderer.root.append("div")
            .attr("class", "stateButtonDiv")
            .style("text-align", "center")  
            .style("padding", "2em")
        .append("input")
            .attr("class", "stateButton")
            .attr("type", "button")
            .attr("value", "Show All States")
            .on("click", showStates);


        function showStates() {
            UI.buttonClicked = UI.buttonClicked === 0 ? 1: 0;
            let states = renderer.svg.selectAll(".stateLink"); 
            //let siteNodes = renderer.svg.selectAll("")
            if (UI.buttonClicked) {
                states.attr('opacity', 1);
                renderer.svg.selectAll('.outerSite')
                    .style("fill", function(d) {
                    d.clicked = 1;
                    d.currentColor = "white";
                    return d.currentColor;
                });
                renderer.root.selectAll(".stateButton").attr("value", "Hide All States");
            }
            else { 
                states.attr('opacity', 0);
                renderer.svg.selectAll('.outerSite')
                    .style("fill", function(d) {
                    d.clicked = 0;
                    d.currentColor = d.agent.color;
                    return d.currentColor;
                });
                renderer.root.selectAll(".stateButton").attr("value", "Show All States");
            }
        }
    }
    
    show(d) {        
        this.tip
            .style("right", 0)		
            .style("top", 0)
            .style("background", d.data.color.brighter())
            .style("opacity", .4);
        this.tip
            .text("agent: " + d.data.label)
            .style('color', d.data.color.darker());
            
    }

    hide() {
        this.tip
            .style("opacity", 0) 
    }
}