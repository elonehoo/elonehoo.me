<script setup lang="ts">

</script>

<template>
  <CraftBox class="h-60!">
    <div class="absolute top-1/2 left-1/2 z-2 perspective-200 spinner color">
      <i
        v-for="i in 100"
        :key="i"
        class="block absolute op-100"
      >
        <b />
      </i>
    </div>
  </CraftBox>
</template>

<style scoped>
.color {
  --bg-color: rgba(0, 0, 0, 1);
}
.dark .color {
  --bg-color: rgba(255, 255, 255, 1);
}
i b {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background: var(--bg-color);
  box-shadow: 0px 0px 14px var(--bg-color);
  animation-name: spin;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
i:nth-child(1) {
  transform: rotate(3.6deg) translate3d(100px, 0, 0);
}
i:nth-child(1) b {
  animation-delay: 0.0306122449s;
}
i:nth-child(2) {
  transform: rotate(7.2deg) translate3d(100px, 0, 0);
}
i:nth-child(2) b {
  animation-delay: 0.0612244898s;
}
i:nth-child(3) {
  transform: rotate(10.8deg) translate3d(100px, 0, 0);
}
i:nth-child(3) b {
  animation-delay: 0.0918367347s;
}
i:nth-child(4) {
  transform: rotate(14.4deg) translate3d(100px, 0, 0);
}
i:nth-child(4) b {
  animation-delay: 0.1224489796s;
}
i:nth-child(5) {
  transform: rotate(18deg) translate3d(100px, 0, 0);
}
i:nth-child(5) b {
  animation-delay: 0.1530612245s;
}
i:nth-child(6) {
  transform: rotate(21.6deg) translate3d(100px, 0, 0);
}
i:nth-child(6) b {
  animation-delay: 0.1836734694s;
}
i:nth-child(7) {
  transform: rotate(25.2deg) translate3d(100px, 0, 0);
}
i:nth-child(7) b {
  animation-delay: 0.2142857143s;
}
i:nth-child(8) {
  transform: rotate(28.8deg) translate3d(100px, 0, 0);
}
i:nth-child(8) b {
  animation-delay: 0.2448979592s;
}
i:nth-child(9) {
  transform: rotate(32.4deg) translate3d(100px, 0, 0);
}
i:nth-child(9) b {
  animation-delay: 0.2755102041s;
}
i:nth-child(10) {
  transform: rotate(36deg) translate3d(100px, 0, 0);
}
i:nth-child(10) b {
  animation-delay: 0.306122449s;
}
i:nth-child(11) {
  transform: rotate(39.6deg) translate3d(100px, 0, 0);
}
i:nth-child(11) b {
  animation-delay: 0.3367346939s;
}
i:nth-child(12) {
  transform: rotate(43.2deg) translate3d(100px, 0, 0);
}
i:nth-child(12) b {
  animation-delay: 0.3673469388s;
}
i:nth-child(13) {
  transform: rotate(46.8deg) translate3d(100px, 0, 0);
}
i:nth-child(13) b {
  animation-delay: 0.3979591837s;
}
i:nth-child(14) {
  transform: rotate(50.4deg) translate3d(100px, 0, 0);
}
i:nth-child(14) b {
  animation-delay: 0.4285714286s;
}
i:nth-child(15) {
  transform: rotate(54deg) translate3d(100px, 0, 0);
}
i:nth-child(15) b {
  animation-delay: 0.4591836735s;
}
i:nth-child(16) {
  transform: rotate(57.6deg) translate3d(100px, 0, 0);
}
i:nth-child(16) b {
  animation-delay: 0.4897959184s;
}
i:nth-child(17) {
  transform: rotate(61.2deg) translate3d(100px, 0, 0);
}
i:nth-child(17) b {
  animation-delay: 0.5204081633s;
}
i:nth-child(18) {
  transform: rotate(64.8deg) translate3d(100px, 0, 0);
}
i:nth-child(18) b {
  animation-delay: 0.5510204082s;
}
i:nth-child(19) {
  transform: rotate(68.4deg) translate3d(100px, 0, 0);
}
i:nth-child(19) b {
  animation-delay: 0.5816326531s;
}
i:nth-child(20) {
  transform: rotate(72deg) translate3d(100px, 0, 0);
}
i:nth-child(20) b {
  animation-delay: 0.612244898s;
}
i:nth-child(21) {
  transform: rotate(75.6deg) translate3d(100px, 0, 0);
}
i:nth-child(21) b {
  animation-delay: 0.6428571429s;
}
i:nth-child(22) {
  transform: rotate(79.2deg) translate3d(100px, 0, 0);
}
i:nth-child(22) b {
  animation-delay: 0.6734693878s;
}
i:nth-child(23) {
  transform: rotate(82.8deg) translate3d(100px, 0, 0);
}
i:nth-child(23) b {
  animation-delay: 0.7040816327s;
}
i:nth-child(24) {
  transform: rotate(86.4deg) translate3d(100px, 0, 0);
}
i:nth-child(24) b {
  animation-delay: 0.7346938776s;
}
i:nth-child(25) {
  transform: rotate(90deg) translate3d(100px, 0, 0);
}
i:nth-child(25) b {
  animation-delay: 0.7653061224s;
}
i:nth-child(26) {
  transform: rotate(93.6deg) translate3d(100px, 0, 0);
}
i:nth-child(26) b {
  animation-delay: 0.7959183673s;
}
i:nth-child(27) {
  transform: rotate(97.2deg) translate3d(100px, 0, 0);
}
i:nth-child(27) b {
  animation-delay: 0.8265306122s;
}
i:nth-child(28) {
  transform: rotate(100.8deg) translate3d(100px, 0, 0);
}
i:nth-child(28) b {
  animation-delay: 0.8571428571s;
}
i:nth-child(29) {
  transform: rotate(104.4deg) translate3d(100px, 0, 0);
}
i:nth-child(29) b {
  animation-delay: 0.887755102s;
}
i:nth-child(30) {
  transform: rotate(108deg) translate3d(100px, 0, 0);
}
i:nth-child(30) b {
  animation-delay: 0.9183673469s;
}
i:nth-child(31) {
  transform: rotate(111.6deg) translate3d(100px, 0, 0);
}
i:nth-child(31) b {
  animation-delay: 0.9489795918s;
}
i:nth-child(32) {
  transform: rotate(115.2deg) translate3d(100px, 0, 0);
}
i:nth-child(32) b {
  animation-delay: 0.9795918367s;
}
i:nth-child(33) {
  transform: rotate(118.8deg) translate3d(100px, 0, 0);
}
i:nth-child(33) b {
  animation-delay: 1.0102040816s;
}
i:nth-child(34) {
  transform: rotate(122.4deg) translate3d(100px, 0, 0);
}
i:nth-child(34) b {
  animation-delay: 1.0408163265s;
}
i:nth-child(35) {
  transform: rotate(126deg) translate3d(100px, 0, 0);
}
i:nth-child(35) b {
  animation-delay: 1.0714285714s;
}
i:nth-child(36) {
  transform: rotate(129.6deg) translate3d(100px, 0, 0);
}
i:nth-child(36) b {
  animation-delay: 1.1020408163s;
}
i:nth-child(37) {
  transform: rotate(133.2deg) translate3d(100px, 0, 0);
}
i:nth-child(37) b {
  animation-delay: 1.1326530612s;
}
i:nth-child(38) {
  transform: rotate(136.8deg) translate3d(100px, 0, 0);
}
i:nth-child(38) b {
  animation-delay: 1.1632653061s;
}
i:nth-child(39) {
  transform: rotate(140.4deg) translate3d(100px, 0, 0);
}
i:nth-child(39) b {
  animation-delay: 1.193877551s;
}
i:nth-child(40) {
  transform: rotate(144deg) translate3d(100px, 0, 0);
}
i:nth-child(40) b {
  animation-delay: 1.2244897959s;
}
i:nth-child(41) {
  transform: rotate(147.6deg) translate3d(100px, 0, 0);
}
i:nth-child(41) b {
  animation-delay: 1.2551020408s;
}
i:nth-child(42) {
  transform: rotate(151.2deg) translate3d(100px, 0, 0);
}
i:nth-child(42) b {
  animation-delay: 1.2857142857s;
}
i:nth-child(43) {
  transform: rotate(154.8deg) translate3d(100px, 0, 0);
}
i:nth-child(43) b {
  animation-delay: 1.3163265306s;
}
i:nth-child(44) {
  transform: rotate(158.4deg) translate3d(100px, 0, 0);
}
i:nth-child(44) b {
  animation-delay: 1.3469387755s;
}
i:nth-child(45) {
  transform: rotate(162deg) translate3d(100px, 0, 0);
}
i:nth-child(45) b {
  animation-delay: 1.3775510204s;
}
i:nth-child(46) {
  transform: rotate(165.6deg) translate3d(100px, 0, 0);
}
i:nth-child(46) b {
  animation-delay: 1.4081632653s;
}
i:nth-child(47) {
  transform: rotate(169.2deg) translate3d(100px, 0, 0);
}
i:nth-child(47) b {
  animation-delay: 1.4387755102s;
}
i:nth-child(48) {
  transform: rotate(172.8deg) translate3d(100px, 0, 0);
}
i:nth-child(48) b {
  animation-delay: 1.4693877551s;
}
i:nth-child(49) {
  transform: rotate(176.4deg) translate3d(100px, 0, 0);
}
i:nth-child(49) b {
  animation-delay: 1.5s;
}
i:nth-child(50) {
  transform: rotate(180deg) translate3d(100px, 0, 0);
}
i:nth-child(50) b {
  animation-delay: 1.5306122449s;
}
i:nth-child(51) {
  transform: rotate(183.6deg) translate3d(100px, 0, 0);
}
i:nth-child(51) b {
  animation-delay: 1.5612244898s;
}
i:nth-child(52) {
  transform: rotate(187.2deg) translate3d(100px, 0, 0);
}
i:nth-child(52) b {
  animation-delay: 1.5918367347s;
}
i:nth-child(53) {
  transform: rotate(190.8deg) translate3d(100px, 0, 0);
}
i:nth-child(53) b {
  animation-delay: 1.6224489796s;
}
i:nth-child(54) {
  transform: rotate(194.4deg) translate3d(100px, 0, 0);
}
i:nth-child(54) b {
  animation-delay: 1.6530612245s;
}
i:nth-child(55) {
  transform: rotate(198deg) translate3d(100px, 0, 0);
}
i:nth-child(55) b {
  animation-delay: 1.6836734694s;
}
i:nth-child(56) {
  transform: rotate(201.6deg) translate3d(100px, 0, 0);
}
i:nth-child(56) b {
  animation-delay: 1.7142857143s;
}
i:nth-child(57) {
  transform: rotate(205.2deg) translate3d(100px, 0, 0);
}
i:nth-child(57) b {
  animation-delay: 1.7448979592s;
}
i:nth-child(58) {
  transform: rotate(208.8deg) translate3d(100px, 0, 0);
}
i:nth-child(58) b {
  animation-delay: 1.7755102041s;
}
i:nth-child(59) {
  transform: rotate(212.4deg) translate3d(100px, 0, 0);
}
i:nth-child(59) b {
  animation-delay: 1.806122449s;
}
i:nth-child(60) {
  transform: rotate(216deg) translate3d(100px, 0, 0);
}
i:nth-child(60) b {
  animation-delay: 1.8367346939s;
}
i:nth-child(61) {
  transform: rotate(219.6deg) translate3d(100px, 0, 0);
}
i:nth-child(61) b {
  animation-delay: 1.8673469388s;
}
i:nth-child(62) {
  transform: rotate(223.2deg) translate3d(100px, 0, 0);
}
i:nth-child(62) b {
  animation-delay: 1.8979591837s;
}
i:nth-child(63) {
  transform: rotate(226.8deg) translate3d(100px, 0, 0);
}
i:nth-child(63) b {
  animation-delay: 1.9285714286s;
}
i:nth-child(64) {
  transform: rotate(230.4deg) translate3d(100px, 0, 0);
}
i:nth-child(64) b {
  animation-delay: 1.9591836735s;
}
i:nth-child(65) {
  transform: rotate(234deg) translate3d(100px, 0, 0);
}
i:nth-child(65) b {
  animation-delay: 1.9897959184s;
}
i:nth-child(66) {
  transform: rotate(237.6deg) translate3d(100px, 0, 0);
}
i:nth-child(66) b {
  animation-delay: 2.0204081633s;
}
i:nth-child(67) {
  transform: rotate(241.2deg) translate3d(100px, 0, 0);
}
i:nth-child(67) b {
  animation-delay: 2.0510204082s;
}
i:nth-child(68) {
  transform: rotate(244.8deg) translate3d(100px, 0, 0);
}
i:nth-child(68) b {
  animation-delay: 2.0816326531s;
}
i:nth-child(69) {
  transform: rotate(248.4deg) translate3d(100px, 0, 0);
}
i:nth-child(69) b {
  animation-delay: 2.112244898s;
}
i:nth-child(70) {
  transform: rotate(252deg) translate3d(100px, 0, 0);
}
i:nth-child(70) b {
  animation-delay: 2.1428571429s;
}
i:nth-child(71) {
  transform: rotate(255.6deg) translate3d(100px, 0, 0);
}
i:nth-child(71) b {
  animation-delay: 2.1734693878s;
}
i:nth-child(72) {
  transform: rotate(259.2deg) translate3d(100px, 0, 0);
}
i:nth-child(72) b {
  animation-delay: 2.2040816327s;
}
i:nth-child(73) {
  transform: rotate(262.8deg) translate3d(100px, 0, 0);
}
i:nth-child(73) b {
  animation-delay: 2.2346938776s;
}
i:nth-child(74) {
  transform: rotate(266.4deg) translate3d(100px, 0, 0);
}
i:nth-child(74) b {
  animation-delay: 2.2653061224s;
}
i:nth-child(75) {
  transform: rotate(270deg) translate3d(100px, 0, 0);
}
i:nth-child(75) b {
  animation-delay: 2.2959183673s;
}
i:nth-child(76) {
  transform: rotate(273.6deg) translate3d(100px, 0, 0);
}
i:nth-child(76) b {
  animation-delay: 2.3265306122s;
}
i:nth-child(77) {
  transform: rotate(277.2deg) translate3d(100px, 0, 0);
}
i:nth-child(77) b {
  animation-delay: 2.3571428571s;
}
i:nth-child(78) {
  transform: rotate(280.8deg) translate3d(100px, 0, 0);
}
i:nth-child(78) b {
  animation-delay: 2.387755102s;
}
i:nth-child(79) {
  transform: rotate(284.4deg) translate3d(100px, 0, 0);
}
i:nth-child(79) b {
  animation-delay: 2.4183673469s;
}
i:nth-child(80) {
  transform: rotate(288deg) translate3d(100px, 0, 0);
}
i:nth-child(80) b {
  animation-delay: 2.4489795918s;
}
i:nth-child(81) {
  transform: rotate(291.6deg) translate3d(100px, 0, 0);
}
i:nth-child(81) b {
  animation-delay: 2.4795918367s;
}
i:nth-child(82) {
  transform: rotate(295.2deg) translate3d(100px, 0, 0);
}
i:nth-child(82) b {
  animation-delay: 2.5102040816s;
}
i:nth-child(83) {
  transform: rotate(298.8deg) translate3d(100px, 0, 0);
}
i:nth-child(83) b {
  animation-delay: 2.5408163265s;
}
i:nth-child(84) {
  transform: rotate(302.4deg) translate3d(100px, 0, 0);
}
i:nth-child(84) b {
  animation-delay: 2.5714285714s;
}
i:nth-child(85) {
  transform: rotate(306deg) translate3d(100px, 0, 0);
}
i:nth-child(85) b {
  animation-delay: 2.6020408163s;
}
i:nth-child(86) {
  transform: rotate(309.6deg) translate3d(100px, 0, 0);
}
i:nth-child(86) b {
  animation-delay: 2.6326530612s;
}
i:nth-child(87) {
  transform: rotate(313.2deg) translate3d(100px, 0, 0);
}
i:nth-child(87) b {
  animation-delay: 2.6632653061s;
}
i:nth-child(88) {
  transform: rotate(316.8deg) translate3d(100px, 0, 0);
}
i:nth-child(88) b {
  animation-delay: 2.693877551s;
}
i:nth-child(89) {
  transform: rotate(320.4deg) translate3d(100px, 0, 0);
}
i:nth-child(89) b {
  animation-delay: 2.7244897959s;
}
i:nth-child(90) {
  transform: rotate(324deg) translate3d(100px, 0, 0);
}
i:nth-child(90) b {
  animation-delay: 2.7551020408s;
}
i:nth-child(91) {
  transform: rotate(327.6deg) translate3d(100px, 0, 0);
}
i:nth-child(91) b {
  animation-delay: 2.7857142857s;
}
i:nth-child(92) {
  transform: rotate(331.2deg) translate3d(100px, 0, 0);
}
i:nth-child(92) b {
  animation-delay: 2.8163265306s;
}
i:nth-child(93) {
  transform: rotate(334.8deg) translate3d(100px, 0, 0);
}
i:nth-child(93) b {
  animation-delay: 2.8469387755s;
}
i:nth-child(94) {
  transform: rotate(338.4deg) translate3d(100px, 0, 0);
}
i:nth-child(94) b {
  animation-delay: 2.8775510204s;
}
i:nth-child(95) {
  transform: rotate(342deg) translate3d(100px, 0, 0);
}
i:nth-child(95) b {
  animation-delay: 2.9081632653s;
}
i:nth-child(96) {
  transform: rotate(345.6deg) translate3d(100px, 0, 0);
}
i:nth-child(96) b {
  animation-delay: 2.9387755102s;
}
i:nth-child(97) {
  transform: rotate(349.2deg) translate3d(100px, 0, 0);
}
i:nth-child(97) b {
  animation-delay: 2.9693877551s;
}
i:nth-child(98) {
  transform: rotate(352.8deg) translate3d(100px, 0, 0);
}
i:nth-child(98) b {
  animation-delay: 3s;
}
i:nth-child(99) {
  transform: rotate(356.4deg) translate3d(100px, 0, 0);
}
i:nth-child(99) b {
  animation-delay: 3.0306122449s;
}
i:nth-child(100) {
  transform: rotate(360deg) translate3d(100px, 0, 0);
}
i:nth-child(100) b {
  animation-delay: 3.0612244898s;
}
@keyframes spin {
  0% {
      transform: scale(1);
  }
  15% {
      transform: translate(-3px, -3px) scale(3);
  }
  50% {
      transform: scale(1);
  }
}
</style>
