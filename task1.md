#Task 1: 


##What is done well?
1.	Stock project is mono-repo, full stack application in one single workspace, having a web app, lib and api
2.	Actual problem statement partially translated to stock component, like used an iexapis to get the live feed of stock data 
3.	Below are the App and libraries 
	- App - stock
	- stocks-feature-shell - Feature module
	- shared-ui-chart - Reusable lib for chart component
	- stocks-data-access-price-query - Lib with NGRX store to feed data for chart. 
	- stocks-data-access-app-config - Lib for maintaining app environment config  
4.	Used google chart component to present the report. 
5.	I was able to generate Dep Graph. Graph gave me highlight of application architecture and its dependency.


##What would you change? 
1.	Even though chart is created as reusable lib, Config for the chart are hardcoded in the chart component and can handle only line chart and doesn’t give flexibility for changing chart format. 

I would change it such that, pass the chart configs to chart component from the component (stock component) that consumes the chart component.
Example: chart configs would be 
	a.	Chart type
	b.	Options 
	c.	Column names
	d.	Chart title 
2.	Charts is displaying close and date values in the chart. The date fields is defined as string rather than date fields. I would define right type for the fields feed to the chart. 
3.	StocksDataAccessPriceQueryModule is imported at the stock app level. As of now this module need not be imported at app level, unless it is required for whole app
4.	StoreDevtoolsModule should be imported always. Could have imported in non-prod environment
5.	Memory leaks in chart component, data is not unsubscribed.
6.	Constraints on the Dependency Graph in nx.json is not well defined. I would update nx.json with right type, build, plaform(client or server) and scope. 
7.	Initial APP Problem statement has requirement for “User enters exchange name and Allow user to enter stock ticker symbol” is not completely addressed. Stock component takes symbol and period as parameter for getting the stock’s data. I would change stock component and FetchPriceQuery effects action to accommodate this requirement.
8.	Date range dropdown doesn’t have default value. I have defaulted to one month data 
9.	API Calls was directly called in effect should have used stock API app for calling api, so that API can be reused in other modules as well.
10. ChangeDetection could have set to onPush rather than default changedetectionstrategy 

##Are there any code smells or problematic implementations?
Below critial issues are observed and fixed:
1. Chart component is imported to stock component but not displayed 
2. Incorrect type is defined in price-query.type.ts for date field we are not able to control the format of dates that can be displayed 
3. Fixed test case issues
4. Error handling action was missing in reducers. Added the same

