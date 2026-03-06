<template>
  <CraftBox>
    <form action="">
      <input id="yes" type="radio" name="rdo" checked>
      <input id="no" type="radio" name="rdo">
      <div class="switch">
        <label for="yes">Yes</label>
        <label for="no">No</label>
        <span />
      </div>
    </form>
  </CraftBox>
</template>

<style scoped>
.switch {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 50px;
  text-align: center;
  margin: -30px 0 0 -75px;
  background: #4cd964;
  transition: all 0.2s ease;
  border-radius: 25px;
}
.switch span {
  position: absolute;
  width: 20px;
  height: 4px;
  top: 50%;
  left: 50%;
  margin: -2px 0px 0px -4px;
  background: #fff;
  display: block;
  transform: rotate(-45deg);
  transition: all 0.2s ease;
  border-radius: 2px;
}
.switch span:after {
  content: "";
  display: block;
  position: absolute;
  width: 4px;
  height: 12px;
  margin-top: -8px;
  background: #fff;
  transition: all 0.2s ease;
  border-radius: 2px;
}
input[type=radio] {
  display: none;
}
.switch label {
  cursor: pointer;
  color: rgba(0,0,0,0.2);
  width: 60px;
  line-height: 50px;
  transition: all 0.2s ease;
}
label[for=yes] {
  position: absolute;
  left: 0px;
  height: 20px;
}
label[for=no] {
  position: absolute;
  right: 0px;
}
#no:checked ~ .switch {
  background: #ff3b30;
}
#no:checked ~ .switch span {
  background: #fff;
  margin-left: -8px;
}
#no:checked ~ .switch span:after {
  background: #fff;
  height: 20px;
  margin-top: -8px;
  margin-left: 8px;
}
#yes:checked ~ .switch label[for=yes] {
  color: #fff;
}
#no:checked ~ .switch label[for=no] {
  color: #fff;
}
</style>
