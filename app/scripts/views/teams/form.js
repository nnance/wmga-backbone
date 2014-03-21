/*global define*/

define([
    'views/formbase',
    'bootstrap.datetimepicker',
    'select2',
    'appsettings'
], function (FormBaseView, BSDateTimePicker, Select2, AppSettings) {
    'use strict';

    var TeamsFormView = FormBaseView.extend({
        template: JST['app/scripts/templates/teams/form.ejs'],

        events: {
            'click #save-button': 'saveButton',
            'click #cancel-button': 'cancelButton',
        },

        initialize: function(options) {
            FormBaseView.prototype.initialize.apply(this, arguments);
            this.userCollection = options.dataManager.userCollection;

            if (this.model.isNew()) {
                this.originalMembers = [];
                this.model.set('members', [this.session.get('userid')]);
                this.model.set('captainid', this.session.get('userid'));
            } else {
                this.originalMembers = this.model.get('members');
            }

            if (options.queryParams && options.queryParams.returnhash) {
                this.returnHash = '#' + options.queryParams.returnhash;
            }
        },

        render: function() {
            FormBaseView.prototype.render.apply(this,arguments);

            this.$('#birthdatepicker').datetimepicker({
                pickTime: false
            });
            this.filestyle({
                selector: '#picture',
                binding: 'picture',
                classButton: 'btn btn-default'
            });
            var memberSelect = this.$('[name="members"]');
            memberSelect.select2();
            _.each(
                this.userCollection.where({paid: true}),
                function(user){
                    memberSelect.append('<option value  ="' + user.id + '">' + user.getFullName() + '</option>');
                }
            );
            memberSelect.select2('val', this.model.get('members'));
            return this;
        },

        getFormData: function() {
            var formData = this.serializeForm('form');
            if (!_.isArray(formData.members)) {
                if (formData.members) {
                    formData.members = [formData.members];
                } else {
                    formData.members = [];
                }
            }
            if (this.session.get('userid') === this.model.get('captainid')) {
                formData.members = _.union(formData.members,[this.session.get('userid')]);
            }
            return formData;
        },

        routeSuccessfulResult: function() {
            var promises = [];

            // update deleted members
            var deletedMembers = _.difference(this.originalMembers, this.model.get('members'));
            _.each(deletedMembers, function(memberid) {
                var member = this.userCollection.get(memberid);
                promises.push(member.save({teamid: ''}));
            },this);

            // update team members
            var addedMembers = _.difference(this.model.get('members'), this.originalMembers);
            _.each(addedMembers, function(memberid) {
                var member = this.userCollection.get(memberid);
                promises.push(member.save({teamid: this.model.id}));
            },this);

            $.when.apply($, promises)
            .done(_.bind(function(){
                var route = this.returnHash ? this.returnHash : '#teams/read/' + this.model.id;
                Backbone.history.navigate(route, true);
            },this));
        }
    });

    return TeamsFormView;
});
