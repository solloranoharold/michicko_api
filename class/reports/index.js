

const inventory = require('../inventory')
const otc = require('../products')
const transaction = require('../transactions')
const moment = require('moment')
// const connection = require('../dbConnections')
const ExcelJS = require('exceljs');
const {queryData } = require('../evaluateConnection')

module.exports = new class Reports{
    //INVENTORY
    async createServiceExportableExcelFile(sheetName , arrayData ,id , workbook ) {
        const worksheet = workbook.addWorksheet(sheetName);
        worksheet.columns = [
            { header: 'Date', key: 'date_created', width: 15 },
            { header: 'Product ID', key: id, width: 10 },
            { header: 'Product Name', key: 'product_name', width: 32 },
            { header: 'Branch', key: 'organization_name', width: 40 },
            { header: 'Quantity', key: 'quantity', width: 10,style: { alignment: { horizontal: 'center' } } },
            { header: 'Previous Stocks', key: 'previous_stock', width: 20,style: { alignment: { horizontal: 'center' } } },
            { header: 'Total Stocks', key: 'current_stock', width: 20,style: { alignment: { horizontal: 'center' } } },
            { header: 'Type', key: 'type', width: 10 },
            { header: 'Updated By', key: 'fullname', width: 25 },
           
        ];
        for (let x = 0; x < arrayData.length; x++){
            let item = arrayData[x]
            item.fullname = `${item.last_name} ${item.first_name}`
             worksheet.addRow(item);
        }
    }
    async generateInventoryReports(data) {
        const workbook = new ExcelJS.Workbook();

        let service_inventory_data = await this.getInventoryService(data)
        console.log(service_inventory_data, ' service_inventory_data')
        await this.createServiceExportableExcelFile('Service Products' , service_inventory_data ,"inventory_id" , workbook)
        let otc_inventory_date = await this.getInventoryOTC(data)
        console.log(otc_inventory_date , 'otc_inventory_date')
        await this.createServiceExportableExcelFile('OTC Products' , otc_inventory_date ,'product_id' , workbook  )
        
        return await workbook.xlsx.writeBuffer()
    }

    async getInventoryService( data) {
        let serviceProducts = await inventory.loadAllInvetory(data.organization_id)
        let addedProductsQty = await this.getServicesAddedProductHistory(serviceProducts, data)
        let usedProductsQty = await this.getServicesUsedProductHistory(serviceProducts, data)
        
        return await Promise.resolve( addedProductsQty.concat(usedProductsQty))

    }
    async getInventoryOTC(data ) {
       let otcProducts = await otc.loadAllProducts(data.organization_id)
        let addedOTC = await this.getOTCAddedProductHistory(otcProducts, data)
        let usedOTC = await this.getOTCProductHistory(otcProducts, data)
        return await Promise.resolve( addedOTC.concat(usedOTC))
    }
    async getOTCAddedProductHistory(otcProducts, data) { 
        let arrayData = []
        const { organization_id, date1, date2 } = data 
         for (let x = 0; x < otcProducts.length; x++){
                let item = await this.OTCAddedProductHistory( otcProducts[x] , organization_id , date1 , date2 )
                arrayData = arrayData.concat(item)
        }
        arrayData.forEach(item => {
           item.type =item.added_quantity == 0 ? 'reset': 'added'
        })
        return  await Promise.resolve(arrayData)
    }
    async getOTCProductHistory(otcProducts,data ) {
         let arrayData = []
        const { organization_id, date1, date2 } = data 
        for (let x = 0; x < otcProducts.length; x++) { 
            let item = await this.OTCUsedProductHistory(otcProducts[x],organization_id, date1, date2)
            arrayData = arrayData.concat(item)
        }
         arrayData.forEach(item => {
           item.type = 'sell'
        })
        return await Promise.resolve( arrayData)
    }
    async OTCUsedProductHistory(item,organization_id, date1, date2) {
        // return new Promise(resolve => {
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `
                select A.*,B.product_name,C.organization_name,D.last_name, D.first_name from tbl_transactions_otc_product A
                inner join tbl_products B on A.product_id = B.product_id
                inner join tbl_organizations C on C.organization_id = A.organization_id
                 inner join tbl_employees D on A.updated_by = D.employee_id
                where A.organization_id = '${organization_id}'
                and A.product_id = '${item.product_id}'
                and A.date_created between '${date1}' and '${date2}'
                and A.status = 1 
            `
        console.log(sql)
        let results = await queryData(sql)
        results.forEach(item => item.quantity = `-${item.less_quantity}pcs`)
        return await Promise.resolve(results)
        //       connection.query(sql, function (error, results, fields) {
        //         //  console.log(results , 'searchAccount')
        //           if (error) throw error;
        //            results.forEach(item => item.quantity = `-${item.less_quantity}pcs`)
        //         resolve(results)
        //     })
        // })
    }
    async OTCAddedProductHistory(item,organization_id , date1 , date2) {
        // return new Promise(resolve => { 
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `
            Select A.*,B.product_name,C.organization_name,D.last_name, D.first_name from tbl_product_history A
             inner join tbl_products B on A.product_id = B.product_id
             inner join tbl_organizations C on C.organization_id = A.organization_id
             inner join tbl_employees D on A.updated_by = D.employee_id
             where A.organization_id= '${organization_id}'
            and A.product_id='${item.product_id}'
            and A.date_created between '${date1}' and '${date2}'
            `
        console.log(sql)
         let results = await queryData(sql)
        results.forEach(item => item.quantity = `+${item.added_quantity}pcs`)
        return await Promise.resolve(results)
        //       connection.query(sql, function (error, results, fields) {
        //         //  console.log(results , 'searchAccount')
        //           if (error) throw error;
        //           results.forEach(item => item.quantity = `+${item.added_quantity}pcs`)
        //         resolve(results)
        //     })
        // })
    }
    async getServicesAddedProductHistory(serviceProducts , data ) {
        let arrayData = []
        const { organization_id , date1 , date2 } = data 
        for (let x = 0; x < serviceProducts.length; x++){
                let item = await this.servicesAddedProductHistory( serviceProducts[x] , organization_id , date1 , date2 )
                arrayData = arrayData.concat(item)
        }
        arrayData.forEach(item => {
           item.type  =item.added_quantity == 0 ? 'reset':'added'
        })
        return await Promise.resolve( arrayData)
        
    }
  
    async getServicesUsedProductHistory( serviceProducts , data) {
        let arrayData = []
        const { organization_id, date1, date2 } = data 
        for (let x = 0; x < serviceProducts.length; x++) { 
            let item = await this.servicesUsedProductHistory(serviceProducts[x],organization_id, date1, date2)
            arrayData = arrayData.concat(item)
        }
         arrayData.forEach(item => {
           item.type = 'used'
        })
        return await Promise.resolve( arrayData)
    }
    

    async servicesAddedProductHistory(item , organization_id , date1 , date2) {
        // return new Promise(resolve => { 
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `
            Select A.*,B.product_name,C.organization_name,D.last_name, D.first_name from tbl_inventory_history A
             inner join tbl_inventory B on A.inventory_id = B.inventory_id
             inner join tbl_organizations C on C.organization_id = A.organization_id
             inner join tbl_employees D on A.updated_by = D.employee_id
             where A.organization_id= '${organization_id}'
            and A.inventory_id='${item.inventory_id}'
            and A.date_created between '${date1}' and '${date2}'
            `
        console.log(sql)
         let results = await queryData(sql)
        results.forEach(item => item.quantity = `+${item.added_quantity}pcs`)
        return await Promise.resolve(results)
        //       connection.query(sql, function (error, results, fields) {
        //         //  console.log(results , 'searchAccount')
        //           if (error) throw error;
        //           results.forEach(item => item.quantity = `+${item.added_quantity}pcs`)
        //         resolve(results)
        //     })
        // })
    }
    async servicesUsedProductHistory(item, organization_id, date1, date2) { 
        // return new Promise(resolve => {
            date1 = moment(date1).format('YYYY-MM-DD 00:00:00')
            date2 = moment(date2).format('YYYY-MM-DD 23:59:59')
            let sql = `
                select A.*,B.product_name,B.unit,C.organization_name,D.last_name, D.first_name from tbl_transactions_services_product A
                inner join tbl_inventory B on A.inventory_id = B.inventory_id
                inner join tbl_organizations C on C.organization_id = A.organization_id
                 inner join tbl_employees D on A.updated_by = D.employee_id
                where A.organization_id = '${organization_id}'
                and A.inventory_id = '${item.inventory_id}'
                and A.date_created between '${date1}' and '${date2}' 
                and A.status =1 
            `
        console.log(sql)
         let results = await queryData(sql)
       results.forEach(item => item.quantity = `-${item.less_quantity}${item.unit.toLowerCase()}`)
        return await Promise.resolve(results)
        //       connection.query(sql, function (error, results, fields) {
        //         //  console.log(results , 'searchAccount')
        //           if (error) throw error;
        //            results.forEach(item => item.quantity = `-${item.less_quantity}${item.unit.toLowerCase()}`)
        //         resolve(results)
        //     })
        // })
    }

    // DAILY SUMMARY
    async createTransactionExportableExcelFile(workbook , services_sales_tracking=[],otc_sales_tracking=[] ) {
       
        if (services_sales_tracking.length) {
            const worksheet1 = workbook.addWorksheet('Service Sales Tracking');
            worksheet1.columns = [
                { header: 'Date', key: 'transaction_created_date', width: 15, style: { alignment: { horizontal: 'center' } } },
                { header: 'Client', key: 'client_name', width: 30, style: { alignment: { horizontal: 'left' } } },
                { header: '# of Works', key: "no_of_works", width: 15, style: { alignment: { horizontal: 'center' } } },
                { header: 'Junior', key: 'Junior', width: 25, style: { alignment: { horizontal: 'left' } } },
                { header: 'Senior', key: 'Senior', width: 25, style: { alignment: { horizontal: 'left' } } },
                { header: 'Original Total Sales', key: 'original_total_amount', width: 30, style: { alignment: { horizontal: 'left' } } },
                { header: 'Discount', key: 'discount', width: 30, style: { alignment: { horizontal: 'left' } } },
                { header: 'Total Sales', key: 'total_sales', width: 30, style: { alignment: { horizontal: 'center' } } },
                { header: 'Sr. Commission', key: 'Sr. Service Commission', width: 30, style: { alignment: { horizontal: 'left' } } },
                { header: 'Jr. Commission', key: 'Jr. Service Commission', width: 30, style: { alignment: { horizontal: 'left' } } },
                { header: 'Total Net', key: 'total_net_sales', width: 30, style: { alignment: { horizontal: 'left' } } },
            ];
            for (let x = 0; x < services_sales_tracking.length; x++){
                let item = services_sales_tracking[x]
                let percent = item.discount ? (item.discount/100) : 0
                let total_discount = percent!=0 ?  item.original_total_amount * percent : 0
                let total_sales = Number(item.original_total_amount) - Number(total_discount)
                item.discount = item.discount ? `${item.discount}%` : 0
                item.total_sales = `₱${parseFloat(total_sales).toFixed(2)}`

                
                item.original_total_amount = `₱${parseFloat(item.original_total_amount).toFixed(2)}`
                let jr_commission = item['Jr. Service Commission'] ? parseFloat(item['Jr. Service Commission']).toFixed(2) : 0
                let sr_commission =  item['Sr. Service Commission'] ?parseFloat(item['Sr. Service Commission']).toFixed(2) : 0
                item['Jr. Service Commission'] = item['Jr. Service Commission'] ? `₱${parseFloat(item['Jr. Service Commission']).toFixed(2)}` : 0
                item['Sr. Service Commission'] = item['Sr. Service Commission'] ? `₱${parseFloat(item['Sr. Service Commission']).toFixed(2)}` : 0
                let total_commission = Number(jr_commission) + Number(sr_commission)
                let total_net_sales=  Number(total_sales) - Number(total_commission)
                item.total_net_sales = `₱${parseFloat(total_net_sales).toFixed(2)}`
                worksheet1.addRow(item);
            }
        }
        if (otc_sales_tracking.length) {
             const worksheet2 = workbook.addWorksheet('OTC Sales Tracking');
            worksheet2.columns = [
                { header: 'Date', key: 'transaction_created_date', width: 15, style: { alignment: { horizontal: 'center' } } },
                 { header: 'Client', key: 'client_name', width: 30, style: { alignment: { horizontal: 'left' } } },
                { header: '# of Products', key: "no_of_products", width: 15, style: { alignment: { horizontal: 'center' } } },
                { header: 'Senior', key: 'Senior', width: 25, style: { alignment: { horizontal: 'left' } } },
                { header: 'Original Total Sales', key: 'original_total_amount', width: 30, style: { alignment: { horizontal: 'left' } } },
                { header: 'Discount', key: 'discount', width: 30, style: { alignment: { horizontal: 'left' } } },
                { header: 'Total Sales', key: 'total_sales', width: 30, style: { alignment: { horizontal: 'center' } } },
                { header: 'Sr. Commission', key: 'Sr. Service Commission', width: 30, style: { alignment: { horizontal: 'left' } } },
                { header: 'Total Net', key: 'total_net_sales', width: 30, style: { alignment: { horizontal: 'left' } } },
            ];
             for (let x = 0; x < otc_sales_tracking.length; x++){
                let item = otc_sales_tracking[x]
                let percent = item.discount ? (item.discount/100) : 0
                let total_discount = percent!=0 ?  item.original_total_amount * percent : 0
                let total_sales = Number(item.original_total_amount) - Number(total_discount)
                item.discount = item.discount ? `${item.discount}%` : 0
                item.total_sales = `₱${parseFloat(total_sales).toFixed(2)}`

                
                item.original_total_amount = `₱${parseFloat(item.original_total_amount).toFixed(2)}`
                let jr_commission = item['Jr. Service Commission'] ? parseFloat(item['Jr. Service Commission']).toFixed(2) : 0
                let sr_commission =  item['Sr. Service Commission'] ?parseFloat(item['Sr. Service Commission']).toFixed(2) : 0
                item['Jr. Service Commission'] = item['Jr. Service Commission'] ? `₱${parseFloat(item['Jr. Service Commission']).toFixed(2)}` : 0
                item['Sr. Service Commission'] = item['Sr. Service Commission'] ? `₱${parseFloat(item['Sr. Service Commission']).toFixed(2)}` : 0
                let total_commission = Number(jr_commission) + Number(sr_commission)
                let total_net_sales=  Number(total_sales) - Number(total_commission)
                item.total_net_sales = `₱${parseFloat(total_net_sales).toFixed(2)}`
                worksheet2.addRow(item);
            }
        }
        // if (otherFees.length > 0) {
            
        //    const worksheet1 = workbook.addWorksheet('Other Fees');
        //     worksheet1.columns = [
        //         { header: 'Date', key: 'date_created', width: 15,style: { alignment: { horizontal: 'center' } } },
        //         { header: 'Transaction ID', key: "transaction_id", width: 20,style: { alignment: { horizontal: 'center' } } },
        //         { header: 'Description', key: 'description', width: 30, style: { alignment: { horizontal: 'left' } } },
        //         { header: 'Amount', key: 'amount', width: 15, style: { alignment: { horizontal: 'left' } } },
        //         { header: 'Operation', key: 'status', width: 15, style: { alignment: { horizontal: 'left' } } },
        //     ];
        //     for (let x = 0; x < otherFees.length; x++){
        //         let item = otherFees[x]
        //         item.status = item.operation == '+' ? 'add' : 'less'
        //         item.amount = `₱${parseFloat(item.amount).toFixed(2)}`
        //         worksheet1.addRow(item);
        //     }
            
            
        // }
    }
    async generateDailySummaryReports(data) {
        const workbook = new ExcelJS.Workbook();
        const {organization_id , date1 , date2 } = data 
        let services_sales_tracking = await transaction.getAllClientTransactionServices(organization_id, date1, date2)
        for (let x = 0; x < services_sales_tracking.length; x++){
            let data= services_sales_tracking[x]
            let serviceCommissionData = await transaction.getAllEmployeeCommissions(data.transaction_id, organization_id, date1, date2 ,'service')
            for (let y = 0; y < serviceCommissionData.length; y++){
                let commision = serviceCommissionData[y]
                if (commision.position == 'Senior') {
                    data.Senior = commision.employee_name
                    data['Sr. Service Commission'] = commision.commission_total_amount
                    data.commision_percent_sr = commision.commissions
                } else {
                    data.Junior = commision.employee_name
                    data['Jr. Service Commission'] = commision.commission_total_amount
                     data.commision_percent_jr = commision.commissions
                }
            }
        }
        let otc_sales_tracking = await transaction.getAllClientTransactionOTC(organization_id, date1, date2)
         for (let x = 0; x < otc_sales_tracking.length; x++){
            let data= otc_sales_tracking[x]
            let otcCommissionData = await transaction.getAllEmployeeCommissions(data.transaction_id, organization_id, date1, date2 ,'otc')
             for (let y = 0; y < otcCommissionData.length; y++){
                let commision = otcCommissionData[y]
                if (commision.position == 'Senior') {
                    data.Senior = commision.employee_name
                    data['Sr. Service Commission'] = commision.commission_total_amount
                    data.commision_percent_sr = commision.commissions
                } else {
                    data.Junior = commision.employee_name
                    data['Jr. Service Commission'] = commision.commission_total_amount
                     data.commision_percent_jr = commision.commissions
                }
            }
        }
        console.log(services_sales_tracking , 'sales_tracking' , otc_sales_tracking, 'otc_sales_tracking')
        await this.createTransactionExportableExcelFile( workbook  ,services_sales_tracking , otc_sales_tracking)
        return await workbook.xlsx.writeBuffer()
    }

    //DASHBOARD
    async generateDashBoardCards(organization_id, date1, date2) {
        let transactions = await transaction.loadAllTransactionsPerDateDashboard(organization_id, date1, date2)
        console.log(transactions, 'transactions')

        transactions.forEach(item => { 
            let net_sales_services = Number(item.service_total_amount) - Number(item.total_commissions_service)
            let net_sales_otc =Number(item.otc_total_amount) - Number(item.total_commissions_otc)
            item.transaction_net_sales_services = net_sales_services
            item.transaction_net_sales_otc = Number(net_sales_otc)
            let total_net_sales = Number(net_sales_services) + Number(net_sales_otc)
            item.transaction_total_net_sales = Number(total_net_sales)
        })
        return await Promise.resolve(transactions)
        
    }

    // loadAllYearlyTransactions
    async generateYearlyActualNet( organization_id ) {
        let transactions = await transaction.loadAllYearlyTransactions(organization_id)
        transactions.forEach(item => { 
            let net_sales_services =Math.abs(Number(item.service_total_amount) - Number(item.total_commissions_service))
            let net_sales_otc =Math.abs(Number(item.otc_total_amount) - Number(item.total_commissions_otc))
            item.transaction_net_sales_services = net_sales_services
            item.transaction_net_sales_otc = Number(net_sales_otc)
            item.transaction_total_amount = Number(item.transaction_total_amount)
            item.total_commissions_service = Number(item.total_commissions_service)
            item.total_commissions_otc = Number(item.total_commissions_otc)
            let total_net_sales = Math.abs(Number(net_sales_services) + Number(net_sales_otc))
            item.transaction_total_net_sales = Number(total_net_sales)
            item.service_total_amount = Number(item.service_total_amount)
            item.otc_total_amount = Number(item.otc_total_amount)
            item.actual_net = Math.abs(Number(net_sales_services) + Number(net_sales_otc))
        })
        return await Promise.resolve(transactions)
   }

    async generateYearServiceSales(organization_id) {
        let service_transactions = await transaction.loadAllServicesSales(organization_id)
        return await service_transactions
    }
    async generateYearOTCSales(organization_id) {
        let otc_transactions = await transaction.loadAllOTCSales(organization_id)
        return await otc_transactions
    }

    


    //EXECUTIVE SUMMARY 
}