import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter, FaTiktok } from "react-icons/fa6";

export default function IconSocial() {
  return (
    <ul className="flex gap-4 text-xl">
      <li><a href="#"><FaInstagram /></a></li>

      <li><a href="#"><FaFacebookF /></a></li>

      <li><a href="#"><FaTiktok /></a></li>

      <li><a href="#"><FaLinkedinIn /></a></li>

      <li><a href="#"><FaXTwitter /></a></li>
    </ul>
  );
}
