module.exports={
  	"orderId":"1",                                                  //订单ID
    "roomId":"1",
    "roomName":"水龙吟",
    "typeName":"花园套房",                                         //房间类型名称
    "nights":4,                                                    //入住天数
    "roomTotalPrice":"320",                                        //总价，该总价为房间总价
    "orgPrice": 880,                                               //原单价
    "checkInDate":"2016-03-20",                                    //入住时间
    "guestName":"张三",                                            //客户
    "phone":"136xxxxxx",                                           //电话
    "channelCode":"0",                                             //渠道编码
    "channelName":"熟客及推介",                                    //渠道类型
    "remark":"JD5135 成都飞丽江 12：25 到 免费接 不收房费，刘刚过来付 客人看房后比较喜欢花园套房，给客人免费升级（小严）",
    "payStatus":"0",                                               //付款状态  0未付款 1 已付款
    "needCar":"0",                                                 //需要车    0不需要 1需要
    "cityName":"成都",
    "checkoutDate":"2016-03-23 13:22:11",                                   //退房时间
    "payedMoney":"0",
    "bookAllRoom":"0",
    "orderItemStatus":"2",
    "remark2":"相关订单:水龙吟, 03/19入住, 1晚, ¥320<span style=\"color:#B5B5B5\">[已退房02/17 13:49] </span>‖踏莎行, 02/16入住, 1晚, ¥880<span style=\"color:#B5B5B5\">[已退房02/17 13:49] </span>‖\n订单总额¥1200，2间房",
    "orderHeader": {                                                //订单头
        "orderItems": [                                             //相关订单，orderHeader关联的所有orderItems概要
            {   
                "itemId": "6330188",                                //订单明细ID               
                "desc": "水龙吟，02/15入住，实住1晚，¥320",         //订单明细描述
                "checkInDate":"2016-03-19 13:22:11",
                "checkoutDate": "2016-03-23 13:22:11",                      //退房时间
                "orderItemStatus": "2",                              //订单状态 0 已预定、1 已入住、2 已退房
                "nights":1,                                        //入住天数
                "roomTotalPrice": 320,                                  //该房间总价
                "orgPrice": 880,                                    //原价
                "roomId":"1",
                "roomName": "水龙吟"
            },
            {
                "itemId": "6331205",
                "desc": "踏莎行，02/16入住，实住1晚，¥880",
                "checkInDate":"2016-02-23 13:22:11",
                "checkoutDate": "2016-02-23 13:22:11",                      //退房时间
                "orderItemStatus": "2",                              //订单状态 0 已预定、1 已入住、2 已退房
                "nights": 1,                                        //入住天数
                "roomTotalPrice": 320,                              //该房间总价
                "orgPrice": 880,                                    //原单价
                "roomId":"1",
                "roomName": "踏莎行"
            }
        ],
        "payInfo": {                                                //付款信息汇总(在数据表设计时可以做一个支付信息头表，可以记录按某个订单的支付概要信息)
            "needPay": 1,                                           //需要付款?  0 不付款 1需要付款                          
            "needPayMoney": 640,                                    //需要付款金额
            "needReturn": 0,                                        //需要退款?  0 不退款 1需要退款
            "returnMoney": 0,                                       //退款金额
            "deposit": 0,                                           //押金
            "payedMoney":0,                                          //实际付费（已收款金额）
            "orderPrice": 640 ,                                      //总价                                  
            "payList": [                                            //付款信息
                {
                    "id": "14422915",                                   //支付编号
                    "orderId": "287",                                   
                    "payMethod":"0",                                    //付款方式 0 现金 1刷卡 2支付宝 3收银台
                    "payMethodName": "现金",                            //付款方式名称
                    "type": "0",                                        //付款类型: 0 收款 1押金 2退房费
                    "amount": 640,                                     //金额
                    "desc": "",                                         //描述
                    "remark": null,                                     //备注
                    "outTradeNo": "",                                   //外部交易流水号，如对接支付宝使用，暂时无用
                    "title": "退房时收款￥640[现金]",                  //操作概要
                    "payPoint":"2",                                     //0 预定时、1 入住时、2 退房时
                }
            ],
        },
        "payedDesc": "¥1200，已收房费¥0(入住时收款¥0)",             //付款描述                                       
    },
    "guests": [              
        {
            "id": "13743640",                                       //客户ID
            "address": "",                                          //地址
            "nation": "",                                           //国家
            "sex": "0",                                             //性别
            "hotelId": "287",
            "name": "蔡总",
            "phone": "18628108610",
            "idType": 0,                                          //证件类型 0 身份证 1 护照 2 军官证 3港澳通行证 4其他
            "idNum": "",                                            //证件号码
            "orderId": "12202930",                      
            "remark": null,                                         //备注
            "isMain": "1",                                          //是否主要责任人， 0 否 1 是，默认为1             
            "cityName": "成都",
            "idTypeName": "身份证"                                  //身份证件类型名称
        }
    ]
}

