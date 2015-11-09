/**
 * Created by root on 08/11/15.
 */

function Subject(code, name, description, quota) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.quota = quota;
    this.registeredStudent = new Array();
}

module.exports = Subject;
