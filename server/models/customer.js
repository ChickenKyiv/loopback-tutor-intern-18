'use strict';

const server = require('../server');

module.exports = function(Customer) {
    Customer.observe("after save", (ctx, next) => {
        const Role = server.models.Role;
        const RoleMapping = server.models.RoleMapping;
        console.log(ctx);
        Role.findOne({where: {name: 'admin'}}, function(err, adminRole) {
            if(err) {
                Role.create({name: 'admin'}).then((role) => {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.instance.id
                    }, function(err, principal) {
                        console.log('Principal ', principal);
                        next();
                    })
                }).catch(err => {
                    throw err;
                })
            } else {
                adminRole.principals.create({
                    principalType: RoleMapping.CUSTOMER,
                    principalId: ctx.instance.id
                }, function(err, principal) {
                    console.log('Principal ', principal);
                    next();
                })  
            }
        })
    })
};
