const commands = {
    _base: 
        '<YAMAHA_AV cmd="PUT"><Main_Zone>%cmd%</Main_Zone></YAMAHA_AV>',

    status:
        '<YAMAHA_AV cmd="GET"><Main_Zone><Basic_Status>GetParam</Basic_Status></Main_Zone></YAMAHA_AV>',

    vol:   
        '<Volume><Lvl><Val>%vol%</Val><Exp>1</Exp><Unit>dB</Unit></Lvl></Volume>',
    volStep: 
        '<Volume><Lvl><Val>%volStep% 1 dB</Val><Exp></Exp><Unit></Unit></Lvl></Volume>',
    power: 
        '<Power_Control><Power>%power%</Power></Power_Control>'
};

module.exports = commands;