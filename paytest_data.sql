--
-- PostgreSQL database dump
--

\restrict UljtuongzyN0xddgsJ9vI23VM20fH13hW2WiI08K0wkeSaTBibnjJQb337Hj62L

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.11 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, slug, description, color, updated_at, created_at) FROM stdin;
1	Technical	technical	Technical or in depth blogposts	#3B82F6	2025-12-02 15:57:57.421+00	2025-12-02 15:57:57.421+00
2	Product	product	Talking more about the UI/UX side of things	#121283	2025-12-02 15:58:40.204+00	2025-12-02 15:58:40.204+00
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media (id, alt, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename, sizes_card_url, sizes_card_width, sizes_card_height, sizes_card_mime_type, sizes_card_filesize, sizes_card_filename, sizes_tablet_url, sizes_tablet_width, sizes_tablet_height, sizes_tablet_mime_type, sizes_tablet_filesize, sizes_tablet_filename, sizes_desktop_url, sizes_desktop_width, sizes_desktop_height, sizes_desktop_mime_type, sizes_desktop_filesize, sizes_desktop_filename) FROM stdin;
4	orange	2025-12-02 16:50:18.505+00	2025-12-02 16:50:18.505+00	\N	\N	claudio-guglieri-YITqbi1T64Q-unsplash.jpg	image/jpeg	1614279	5120	2880	50	50	\N	400	300	image/jpeg	8880	claudio-guglieri-YITqbi1T64Q-unsplash-400x300.jpg	\N	768	1024	image/jpeg	51694	claudio-guglieri-YITqbi1T64Q-unsplash-768x1024.jpg	\N	1024	576	image/jpeg	42098	claudio-guglieri-YITqbi1T64Q-unsplash-1024x576.jpg	\N	1920	1080	image/jpeg	143234	claudio-guglieri-YITqbi1T64Q-unsplash-1920x1080.jpg
5	green	2025-12-02 16:50:19.109+00	2025-12-02 16:50:19.109+00	\N	\N	claudio-guglieri-eGaUal0fgRc-unsplash.jpg	image/jpeg	1421321	5120	2880	50	50	\N	400	300	image/jpeg	7003	claudio-guglieri-eGaUal0fgRc-unsplash-400x300.jpg	\N	768	1024	image/jpeg	42833	claudio-guglieri-eGaUal0fgRc-unsplash-768x1024.jpg	\N	1024	576	image/jpeg	33702	claudio-guglieri-eGaUal0fgRc-unsplash-1024x576.jpg	\N	1920	1080	image/jpeg	118535	claudio-guglieri-eGaUal0fgRc-unsplash-1920x1080.jpg
6	blue	2025-12-02 16:50:19.702+00	2025-12-02 16:50:19.702+00	\N	\N	claudio-guglieri-gb37v81_Ni4-unsplash.jpg	image/jpeg	1279830	5120	2880	50	50	\N	400	300	image/jpeg	7280	claudio-guglieri-gb37v81_Ni4-unsplash-400x300.jpg	\N	768	1024	image/jpeg	43827	claudio-guglieri-gb37v81_Ni4-unsplash-768x1024.jpg	\N	1024	576	image/jpeg	34861	claudio-guglieri-gb37v81_Ni4-unsplash-1024x576.jpg	\N	1920	1080	image/jpeg	121502	claudio-guglieri-gb37v81_Ni4-unsplash-1920x1080.jpg
7	black	2025-12-02 16:50:20.295+00	2025-12-02 16:50:20.295+00	\N	\N	claudio-guglieri-Qj8haLTfHzs-unsplash.jpg	image/jpeg	1282819	5120	2880	50	50	\N	400	300	image/jpeg	6858	claudio-guglieri-Qj8haLTfHzs-unsplash-400x300.jpg	\N	768	1024	image/jpeg	42471	claudio-guglieri-Qj8haLTfHzs-unsplash-768x1024.jpg	\N	1024	576	image/jpeg	33450	claudio-guglieri-Qj8haLTfHzs-unsplash-1024x576.jpg	\N	1920	1080	image/jpeg	117707	claudio-guglieri-Qj8haLTfHzs-unsplash-1920x1080.jpg
3	mountain	2025-12-02 16:51:51.198+00	2025-12-02 16:49:38.174+00	/api/media/file/IMG_7638.JPG	\N	IMG_7638.JPG	image/jpeg	3832335	3024	4032	48	67	/api/media/file/IMG_7638-400x300.jpg	400	300	image/jpeg	17602	IMG_7638-400x300.jpg	/api/media/file/IMG_7638-768x1024.jpg	768	1024	image/jpeg	74786	IMG_7638-768x1024.jpg	/api/media/file/IMG_7638-1024x1365.jpg	1024	1365	image/jpeg	125169	IMG_7638-1024x1365.jpg	/api/media/file/IMG_7638-1920x2560.jpg	1920	2560	image/jpeg	439175	IMG_7638-1920x2560.jpg
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until, name) FROM stdin;
2	2025-12-10 20:39:28.192+00	2025-12-02 15:57:24.923+00	blograso@gmail.com	97110ec03e3e96107636d05bd4a9185b668b3383	2025-12-10 21:30:46.941+00	93dc10147ebb46183dadb55b9cb2a3b5fcdad2b744c26fe2b3ac1000a35290b6	e4d1f4cea90f4ccd801fa03cf2455e9d0f7b70f6e37c7600d7b2de54a7a9428e9bc91506fb53b4b7cc9edafff3862d51bd1ec785c7de74a2d2eecd466da28154ac5d8a65dda2c110b5176b754ea90b4ecda3c88126922db2f83c317acb0a5125a73e6717a4f633771b05e63f613c93d5d387a6ba7afca343c10aec532e44ad3885f208855c143d9ebe458cbb553d2efb598bd9a99d077aa61998dd5e5eb2170170df64f57bd5eb32839579cba4f95be4492b987351b487e4022b3727da449d399d1b8914fb315044f7bc78af0017eeb37db8fda7ce21f385e60f45dcd183d8d14708f03a2f49175c51197ed3573e8fb8f677eee3d7f8cb5d707d79c3c62f9026aea8a394341b55225cafa3ce442fdf0c07641b9baf541a99e16503edd67df15d5e7231310bb0ab0aa9967b16bf1968c1a1c64fa937e64e82de5cd37b9d9d0d24e9605039fa9d932eca6d79c5508ad35ed745897340bae17ec340d4bd7b4b801fe2aae8aabf72a7cdcc7d7654609e65713bbc36301cf815be3ec1313ecaa16a6206f996fa0cdf76929aaf2e85e3e12f9fec196755dc63171ba819f76e1f37155a59dc8d7141f12b8d85c7f0df7d461aacd7e77467d0ebaeb7e3c62c6c6f306809850f8d316772b054bc45ffcb55605098b209a8ec84d3419000feb4ef2c704f779f30203139bf4a671d4e9effd04273ed5d3ff1c4aa2ad37dba0164acd37c943e	0	\N	jesús
\.


--
-- Data for Name: blog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog (id, title, slug, status, author_id, published_date, featured_image_id, excerpt, category_id, featured, seo_meta_title, seo_meta_description, seo_meta_image_id, updated_at, created_at) FROM stdin;
1	Damn	damn	published	2	2025-12-01 23:00:00+00	4	Very nice	1	f	\N	\N	\N	2025-12-02 16:50:41.448+00	2025-12-02 16:00:09.658+00
2	Holy shit	holy-shit	published	2	2025-12-01 23:00:00+00	3	Very nice	1	t	\N	\N	\N	2025-12-10 21:07:09.184+00	2025-12-02 16:02:11.926+00
\.


--
-- Data for Name: blog_blocks_call_to_action; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_blocks_call_to_action (_order, _parent_id, _path, id, heading, description, button_text, button_link, style, block_name) FROM stdin;
2	2	content	692f0d3954a5d375bd42d204	pls money	pls tons o money	pls money here	moore moey	primary	\N
\.


--
-- Data for Name: blog_blocks_code_block; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_blocks_code_block (_order, _parent_id, _path, id, code, language, filename, block_name) FROM stdin;
\.


--
-- Data for Name: blog_blocks_image_block; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_blocks_image_block (_order, _parent_id, _path, id, image_id, caption, size, block_name) FROM stdin;
\.


--
-- Data for Name: blog_blocks_quote; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_blocks_quote (_order, _parent_id, _path, id, text, author, style, block_name) FROM stdin;
\.


--
-- Data for Name: blog_blocks_rich_text; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_blocks_rich_text (_order, _parent_id, _path, id, content, block_name) FROM stdin;
1	1	content	692f0ced54a5d375bd42d1fe	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ut commodo labore irure sint sint et laboris duis nulla eiusmod consequat qui esse. Minim irure ex aute ea anim consectetur dolore eu nulla. Commodo cillum in fugiat esse dolor minim ad commodo reprehenderit adipisicing. Amet nisi do incididunt veniam minim laboris consequat minim duis laboris incididunt.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ut ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "commodo labore irure", "type": "text", "style": "", "detail": 0, "format": 1, "version": 1}, {"mode": "normal", "text": " sint sint et laboris duis nulla eiusmod consequat qui esse. Minim irure ex aute ea anim consectetur dolore eu nulla. Commodo cillum in fugiat esse dolor minim ad commodo reprehenderit adipisicing. Amet nisi do incididunt veniam minim laboris consequat minim duis laboris incididunt.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ut commodo labore irure sint sint et laboris duis nulla eiusmod consequat qui esse. Minim irure ex aute ea anim consectetur dolore eu nulla. Commodo cillum in fugiat esse dolor minim ad commodo reprehenderit adipisicing. Amet nisi do incididunt veniam minim laboris consequat minim duis laboris incididunt.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ut commodo ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "labore irure sint sint et laboris", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": " duis nulla eiusmod consequat qui esse. Minim irure ex aute ea anim consectetur dolore eu nulla. Commodo cillum in fugiat esse dolor minim ad commodo reprehenderit adipisicing. Amet nisi do incididunt veniam minim laboris consequat minim duis laboris incididunt.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Ut commodo labore irure sint ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"mode": "normal", "text": "sint et laboris duis nulla eiusmod", "type": "text", "style": "", "detail": 0, "format": 4, "version": 1}, {"mode": "normal", "text": " consequat qui esse. Minim irure ex aute ea anim consectetur dolore eu nulla. Commodo cillum in fugiat esse dolor minim ad commodo reprehenderit adipisicing. Amet nisi do incididunt veniam minim laboris consequat minim duis laboris incididunt.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	yoloing
1	2	content	692f0d2754a5d375bd42d200	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"tag": "h1", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "yeah", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "nice", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "loll", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "adsfas", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "ayea", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "asdfasdf", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Non dolore tempor irure eu enim tempor laborum aute consectetur fugiat deserunt voluptate aute excepteur consequat. Laborum elit proident mollit sunt pariatur nisi excepteur ut non pariatur cupidatat aute. Occaecat qui ea eu consequat sit quis tempor adipisicing Lorem exercitation cillum qui ad. Voluptate magna aliqua cillum nulla sint ea. Ut qui reprehenderit sit aute tempor.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Veniam dolor occaecat nostrud cupidatat nostrud. Fugiat non est ex est eu cillum veniam cillum. Veniam ut fugiat laborum nisi consectetur culpa laboris duis dolor. Ut velit sint commodo reprehenderit mollit aliqua minim qui sint proident commodo aute. Commodo minim esse quis duis dolor ipsum amet. Minim deserunt labore id commodo sint voluptate ullamco aliqua in laborum esse do. Ipsum cillum nostrud reprehenderit mollit id ullamco aliqua et deserunt incididunt sit nostrud esse.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Laboris proident magna anim tempor labore exercitation duis. Incididunt incididunt duis nulla cillum Lorem proident exercitation aute culpa mollit nisi ut est. Officia nostrud ea ex do sint fugiat. Veniam enim dolore consequat excepteur quis ullamco eu labore Lorem tempor laboris quis nisi eiusmod. Mollit irure et cupidatat enim. Nostrud elit irure sunt consectetur commodo culpa ullamco incididunt fugiat ut cillum. Reprehenderit in mollit adipisicing fugiat non eu anim commodo sunt culpa dolore culpa. Aliqua nostrud sint ipsum tempor cupidatat esse.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Velit excepteur duis mollit voluptate est eu. Ipsum est elit commodo labore dolore cillum. Adipisicing nostrud cillum sunt aliqua magna quis cupidatat nulla culpa laborum. Deserunt culpa ea est in elit dolor aute labore ad eu minim. Commodo irure nisi ut occaecat sint cillum nulla ea. Amet nostrud adipisicing magna non. Dolore sint laborum pariatur consectetur sunt adipisicing ex. Deserunt irure cillum magna excepteur voluptate proident Lorem sit adipisicing.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N
\.


--
-- Data for Name: blog_blocks_two_column; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_blocks_two_column (_order, _parent_id, _path, id, left_column, right_column, block_name) FROM stdin;
\.


--
-- Data for Name: blog_blocks_video_embed; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_blocks_video_embed (_order, _parent_id, _path, id, url, caption, block_name) FROM stdin;
\.


--
-- Data for Name: blog_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_rels (id, "order", parent_id, path, blog_id) FROM stdin;
11	1	2	relatedPosts	2
\.


--
-- Data for Name: blog_tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.blog_tags (_order, _parent_id, id, tag) FROM stdin;
1	1	692f0cdd54a5d375bd42d1fa	super
2	1	692f0ce354a5d375bd42d1fc	nice
\.


--
-- Data for Name: payload_kv; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_kv (id, key, data) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.photos (id, alt, caption, iso, shutter_speed, aperture, focal_length, camera, lens, date_taken, latitude, longitude, location, white_balance, flash, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename, sizes_card_url, sizes_card_width, sizes_card_height, sizes_card_mime_type, sizes_card_filesize, sizes_card_filename, sizes_tablet_url, sizes_tablet_width, sizes_tablet_height, sizes_tablet_mime_type, sizes_tablet_filesize, sizes_tablet_filename, sizes_desktop_url, sizes_desktop_width, sizes_desktop_height, sizes_desktop_mime_type, sizes_desktop_filesize, sizes_desktop_filename, sizes_fullsize_url, sizes_fullsize_width, sizes_fullsize_height, sizes_fullsize_mime_type, sizes_fullsize_filesize, sizes_fullsize_filename) FROM stdin;
1	mountain	Mountain of Jaén	25	1/950	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2025-11-16 13:16:30+00	37.76907833333333	-3.785675	\N	Unknown	Did not fire	2025-12-14 21:13:34.243+00	2025-12-14 21:13:34.243+00	\N	\N	IMG_7638.JPG	image/jpeg	3832335	3024	4032	50	50	\N	400	300	image/jpeg	13587	IMG_7638-400x300.jpg	\N	768	1024	image/jpeg	74786	IMG_7638-768x1024.jpg	\N	1024	1365	image/jpeg	125169	IMG_7638-1024x1365.jpg	\N	1920	2560	image/jpeg	439175	IMG_7638-1920x2560.jpg	\N	\N	\N	\N	\N	\N
2	Mezquita	Mezquita	20	1/170	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2023-11-01 15:13:00+00	37.87927166666667	-4.780025	\N	Unknown	Did not fire	2025-12-14 21:38:11.966+00	2025-12-14 21:38:11.965+00	\N	\N	IMG_2971.JPG	image/jpeg	5061858	3024	4032	50	50	\N	400	300	image/jpeg	26646	IMG_2971-400x300.jpg	\N	768	1024	image/jpeg	122781	IMG_2971-768x1024.jpg	\N	1024	1365	image/jpeg	210238	IMG_2971-1024x1365.jpg	\N	1920	2560	image/jpeg	738613	IMG_2971-1920x2560.jpg	\N	\N	\N	\N	\N	\N
3	Bosque	Bosque	64	1/500	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.86mm f/1.78	2023-11-25 10:51:57+00	37.73956833333333	-3.814728333333333	\N	Unknown	Did not fire	2025-12-14 21:38:12.804+00	2025-12-14 21:38:12.804+00	\N	\N	IMG_3215.JPG	image/jpeg	7473655	3024	4032	50	50	\N	400	300	image/jpeg	48703	IMG_3215-400x300.jpg	\N	768	1024	image/jpeg	275980	IMG_3215-768x1024.jpg	\N	1024	1365	image/jpeg	462051	IMG_3215-1024x1365.jpg	\N	1920	2560	image/jpeg	1275419	IMG_3215-1920x2560.jpg	\N	\N	\N	\N	\N	\N
4	Vías del tren	Vías del tren	20	1/160	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2023-12-01 13:56:51+00	37.88856666666667	-4.790821666666667	\N	Unknown	Did not fire	2025-12-14 21:38:13.671+00	2025-12-14 21:38:13.67+00	\N	\N	IMG_3233.JPG	image/jpeg	3918450	2444	3258	50	50	\N	400	300	image/jpeg	21579	IMG_3233-400x300.jpg	\N	768	1024	image/jpeg	126090	IMG_3233-768x1024.jpg	\N	1024	1365	image/jpeg	226721	IMG_3233-1024x1365.jpg	\N	1920	2559	image/jpeg	857479	IMG_3233-1920x2559.jpg	\N	\N	\N	\N	\N	\N
5	Puente romano	Puente romano	100	1/20000	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.86mm f/1.78	2024-01-05 12:01:01+00	37.877275	-4.7794944444444445	\N	Unknown	Did not fire	2025-12-14 21:38:14.569+00	2025-12-14 21:38:14.569+00	\N	\N	IMG_3351.JPG	image/jpeg	4428898	4077	4234	50	50	\N	400	300	image/jpeg	26187	IMG_3351-400x300.jpg	\N	768	1024	image/jpeg	122171	IMG_3351-768x1024.jpg	\N	1024	1063	image/jpeg	170610	IMG_3351-1024x1063.jpg	\N	1920	1994	image/jpeg	570155	IMG_3351-1920x1994.jpg	\N	3840	3988	image/jpeg	2299657	IMG_3351-3840x3988.jpg
6	Jaén	Jaén	25	1/7400	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-01-14 15:00:51+00	37.769063333333335	-3.7856183333333333	\N	Unknown	Did not fire	2025-12-14 21:38:15.274+00	2025-12-14 21:38:15.274+00	\N	\N	IMG_3472.JPG	image/jpeg	2943464	2410	2861	50	50	\N	400	300	image/jpeg	10288	IMG_3472-400x300.jpg	\N	768	1024	image/jpeg	65433	IMG_3472-768x1024.jpg	\N	1024	1216	image/jpeg	113040	IMG_3472-1024x1216.jpg	\N	1920	2279	image/jpeg	613101	IMG_3472-1920x2279.jpg	\N	\N	\N	\N	\N	\N
7	Córdoba por Palestina	Córdoba por Palestina	40	1/120	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-01-21 11:36:07+00	37.88245333333333	-4.776491666666667	\N	Unknown	Did not fire	2025-12-14 21:38:16.19+00	2025-12-14 21:38:16.189+00	\N	\N	IMG_3507.JPG	image/jpeg	6682399	2621	3699	50	50	\N	400	300	image/jpeg	36700	IMG_3507-400x300.jpg	\N	768	1024	image/jpeg	210550	IMG_3507-768x1024.jpg	\N	1024	1445	image/jpeg	375062	IMG_3507-1024x1445.jpg	\N	1920	2710	image/jpeg	1306543	IMG_3507-1920x2710.jpg	\N	\N	\N	\N	\N	\N
8	Paraguas	Paraguas	64	1/6400	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.86mm f/1.78	2024-02-10 12:58:02+00	37.890211666666666	-4.7747383333333335	\N	Unknown	Did not fire	2025-12-14 21:38:17.189+00	2025-12-14 21:38:17.189+00	\N	\N	IMG_3578.JPG	image/jpeg	5112890	2717	3396	50	50	\N	400	300	image/jpeg	17697	IMG_3578-400x300.jpg	\N	768	1024	image/jpeg	123649	IMG_3578-768x1024.jpg	\N	1024	1280	image/jpeg	215980	IMG_3578-1024x1280.jpg	\N	1920	2400	image/jpeg	896668	IMG_3578-1920x2400.jpg	\N	\N	\N	\N	\N	\N
9	Avión	Avión	500	1/17	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-03-06 18:30:12+00	37.87587166666667	-4.7676783333333335	\N	Unknown	Did not fire	2025-12-14 21:38:18.377+00	2025-12-14 21:38:18.376+00	\N	\N	IMG_3650.JPG	image/jpeg	4146646	3024	4032	50	50	\N	400	300	image/jpeg	13752	IMG_3650-400x300.jpg	\N	768	1024	image/jpeg	62427	IMG_3650-768x1024.jpg	\N	1024	1365	image/jpeg	115584	IMG_3650-1024x1365.jpg	\N	1920	2560	image/jpeg	519888	IMG_3650-1920x2560.jpg	\N	\N	\N	\N	\N	\N
10	Corteza	Corteza	25	1/700	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-03-16 12:06:55+00	37.886693333333334	-4.8661183333333335	\N	Unknown	Did not fire	2025-12-14 21:38:19.656+00	2025-12-14 21:38:19.656+00	\N	\N	IMG_3717.JPG	image/jpeg	8599688	3024	4032	50	50	\N	400	300	image/jpeg	37594	IMG_3717-400x300.jpg	\N	768	1024	image/jpeg	258921	IMG_3717-768x1024.jpg	\N	1024	1365	image/jpeg	473476	IMG_3717-1024x1365.jpg	\N	1920	2560	image/jpeg	1553272	IMG_3717-1920x2560.jpg	\N	\N	\N	\N	\N	\N
11	Batería	Batería	100	1/120	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.86mm f/1.78	2024-03-22 14:58:45+00	38.101036666666666	-3.6379816666666667	\N	Unknown	Did not fire	2025-12-14 21:38:22.582+00	2025-12-14 21:38:22.582+00	\N	\N	IMG_3772.JPG	image/jpeg	10149665	6048	8064	50	50	\N	400	300	image/jpeg	18235	IMG_3772-400x300.jpg	\N	768	1024	image/jpeg	104942	IMG_3772-768x1024.jpg	\N	1024	1365	image/jpeg	182789	IMG_3772-1024x1365.jpg	\N	1920	2560	image/jpeg	564300	IMG_3772-1920x2560.jpg	\N	3840	5120	image/jpeg	1748093	IMG_3772-3840x5120.jpg
12	Curva	Curva	25	1/950	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-03-23 10:49:13+00	40.423246666666664	-3.7115616666666664	\N	Unknown	Did not fire	2025-12-14 21:38:23.839+00	2025-12-14 21:38:23.839+00	\N	\N	IMG_3777.JPG	image/jpeg	5413616	3024	4032	50	50	\N	400	300	image/jpeg	11805	IMG_3777-400x300.jpg	\N	768	1024	image/jpeg	63286	IMG_3777-768x1024.jpg	\N	1024	1365	image/jpeg	125882	IMG_3777-1024x1365.jpg	\N	1920	2560	image/jpeg	626553	IMG_3777-1920x2560.jpg	\N	\N	\N	\N	\N	\N
13	Madrid	Madrid	25	1/800	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-03-23 11:10:59+00	40.42310833333333	-3.7176066666666667	\N	Unknown	Did not fire	2025-12-14 21:38:24.584+00	2025-12-14 21:38:24.584+00	\N	\N	IMG_3778.JPG	image/jpeg	3067686	2681	3575	50	50	\N	400	300	image/jpeg	17203	IMG_3778-400x300.jpg	\N	768	1024	image/jpeg	105489	IMG_3778-768x1024.jpg	\N	1024	1365	image/jpeg	182337	IMG_3778-1024x1365.jpg	\N	1920	2560	image/jpeg	606683	IMG_3778-1920x2560.jpg	\N	\N	\N	\N	\N	\N
14	Cine	Cine	100	1/1400	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-05-01 17:37:18+00	37.94405277777778	-4.2120500000000005	\N	Unknown	Did not fire	2025-12-14 21:38:25.594+00	2025-12-14 21:38:25.594+00	\N	\N	IMG_4007.jpg	image/jpeg	1384816	3079	3079	50	50	\N	400	300	image/jpeg	21325	IMG_4007-400x300.jpg	\N	768	1024	image/jpeg	99214	IMG_4007-768x1024.jpg	\N	1024	1024	image/jpeg	123090	IMG_4007-1024x1024.jpg	\N	1920	1920	image/jpeg	317662	IMG_4007-1920x1920.jpg	\N	\N	\N	\N	\N	\N
15	Rosana	Rosana	25	1/350	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-05-24 13:36:44+00	36.741256666666665	-5.1678283333333335	\N	Unknown	Did not fire	2025-12-14 21:38:27.17+00	2025-12-14 21:38:27.17+00	\N	\N	IMG_4147.JPG	image/jpeg	5696589	3024	4032	50	50	\N	400	300	image/jpeg	34178	IMG_4147-400x300.jpg	\N	768	1024	image/jpeg	172243	IMG_4147-768x1024.jpg	\N	1024	1365	image/jpeg	289862	IMG_4147-1024x1365.jpg	\N	1920	2560	image/jpeg	953719	IMG_4147-1920x2560.jpg	\N	\N	\N	\N	\N	\N
16	Ronda	Ronda	64	1/1050	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-05-24 18:01:57+00	36.739338333333336	-5.168228333333333	\N	Unknown	Did not fire	2025-12-14 21:38:28.594+00	2025-12-14 21:38:28.594+00	\N	\N	IMG_4170.JPG	image/jpeg	5654366	3024	4032	50	50	\N	400	300	image/jpeg	28002	IMG_4170-400x300.jpg	\N	768	1024	image/jpeg	146618	IMG_4170-768x1024.jpg	\N	1024	1365	image/jpeg	263163	IMG_4170-1024x1365.jpg	\N	1920	2560	image/jpeg	914636	IMG_4170-1920x2560.jpg	\N	\N	\N	\N	\N	\N
17	Paisaje	Paisaje	80	1/120	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-05-25 19:26:40+00	36.837138888888894	-5.389919444444445	\N	Unknown	Did not fire	2025-12-14 21:38:29.527+00	2025-12-14 21:38:29.527+00	\N	\N	IMG_4228.JPG	image/jpeg	2900657	4234	4234	50	50	\N	400	300	image/jpeg	17757	IMG_4228-400x300.jpg	\N	768	1024	image/jpeg	101865	IMG_4228-768x1024.jpg	\N	1024	1024	image/jpeg	132798	IMG_4228-1024x1024.jpg	\N	1920	1920	image/jpeg	447176	IMG_4228-1920x1920.jpg	\N	3840	3840	image/jpeg	1472957	IMG_4228-3840x3840.jpg
18	Ventanas al alma	Ventanas al alma	64	1/6400	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-05-26 11:20:50+00	36.83180277777778	-5.240369444444444	\N	Unknown	Did not fire	2025-12-14 21:38:30.562+00	2025-12-14 21:38:30.562+00	\N	\N	IMG_4253.jpg	image/jpeg	3642770	2655	3540	50	50	\N	400	300	image/jpeg	23948	IMG_4253-400x300.jpg	\N	768	1024	image/jpeg	153248	IMG_4253-768x1024.jpg	\N	1024	1365	image/jpeg	273196	IMG_4253-1024x1365.jpg	\N	1920	2560	image/jpeg	914103	IMG_4253-1920x2560.jpg	\N	\N	\N	\N	\N	\N
19	Amarillo	Amarillo	25	1/640	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-07-18 11:52:12+00	37.88424666666667	-4.782378333333334	\N	Unknown	Did not fire	2025-12-14 21:38:32.048+00	2025-12-14 21:38:32.048+00	\N	\N	IMG_4511.JPG	image/jpeg	4285265	2947	3929	50	50	\N	400	300	image/jpeg	19797	IMG_4511-400x300.jpg	\N	768	1024	image/jpeg	108625	IMG_4511-768x1024.jpg	\N	1024	1365	image/jpeg	189571	IMG_4511-1024x1365.jpg	\N	1920	2560	image/jpeg	687016	IMG_4511-1920x2560.jpg	\N	\N	\N	\N	\N	\N
20	Playa	Playa	64	1/7100	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-07-29 08:49:18+00	43.44133333333333	-4.874088333333333	\N	Unknown	Did not fire	2025-12-14 21:38:33.146+00	2025-12-14 21:38:33.145+00	\N	\N	IMG_4555.JPG	image/jpeg	3312353	2744	3658	50	50	\N	400	300	image/jpeg	12456	IMG_4555-400x300.jpg	\N	768	1024	image/jpeg	79155	IMG_4555-768x1024.jpg	\N	1024	1365	image/jpeg	140794	IMG_4555-1024x1365.jpg	\N	1920	2560	image/jpeg	504196	IMG_4555-1920x2560.jpg	\N	\N	\N	\N	\N	\N
24	Grúa	Grúa	100	1/5000	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-08-01 14:41:58+00	43.55403888888888	-6.085391666666666	\N	Unknown	Did not fire	2025-12-14 21:38:38.443+00	2025-12-14 21:38:38.443+00	\N	\N	IMG_4650.jpg	image/jpeg	2556668	2962	3950	50	50	\N	400	300	image/jpeg	16512	IMG_4650-400x300.jpg	\N	768	1024	image/jpeg	97210	IMG_4650-768x1024.jpg	\N	1024	1366	image/jpeg	160713	IMG_4650-1024x1366.jpg	\N	1920	2560	image/jpeg	487212	IMG_4650-1920x2560.jpg	\N	\N	\N	\N	\N	\N
32	Costa	Costa	80	1/430	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2025-05-02 18:46:55+00	36.744661666666666	-3.8755716666666666	\N	Unknown	Did not fire	2025-12-14 21:38:51.703+00	2025-12-14 21:38:51.698+00	\N	\N	IMG_6114.JPG	image/jpeg	3541991	2602	3470	50	50	\N	400	300	image/jpeg	21295	IMG_6114-400x300.jpg	\N	768	1024	image/jpeg	126554	IMG_6114-768x1024.jpg	\N	1024	1366	image/jpeg	222210	IMG_6114-1024x1366.jpg	\N	1920	2560	image/jpeg	704751	IMG_6114-1920x2560.jpg	\N	\N	\N	\N	\N	\N
21	Bañistas	Bañistas	64	1/4600	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-07-29 08:51:32+00	43.44139333333333	-4.874641666666666	\N	Unknown	Did not fire	2025-12-14 21:38:34.344+00	2025-12-14 21:38:34.344+00	\N	\N	IMG_4556.JPG	image/jpeg	6131951	3024	4032	50	50	\N	400	300	image/jpeg	27786	IMG_4556-400x300.jpg	\N	768	1024	image/jpeg	170041	IMG_4556-768x1024.jpg	\N	1024	1365	image/jpeg	295264	IMG_4556-1024x1365.jpg	\N	1920	2560	image/jpeg	927273	IMG_4556-1920x2560.jpg	\N	\N	\N	\N	\N	\N
22	Vías del tren	Vías del tren	32	1/120	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-07-29 14:52:45+00	43.431177777777776	-5.073338888888888	\N	Unknown	Did not fire	2025-12-14 21:38:36.437+00	2025-12-14 21:38:36.437+00	\N	\N	IMG_4578.jpg	image/jpeg	6190344	2861	3814	50	50	\N	400	300	image/jpeg	35811	IMG_4578-400x300.jpg	\N	768	1024	image/jpeg	234103	IMG_4578-768x1024.jpg	\N	1024	1365	image/jpeg	424998	IMG_4578-1024x1365.jpg	\N	1920	2560	image/jpeg	1446832	IMG_4578-1920x2560.jpg	\N	\N	\N	\N	\N	\N
23	Luz	Luz	2000	1/100	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-07-31 19:00:19+00	43.37135277777778	-5.810955555555555	\N	Unknown	Did not fire	2025-12-14 21:38:37.404+00	2025-12-14 21:38:37.404+00	\N	\N	IMG_4608.jpg	image/jpeg	2767536	2697	3596	50	50	\N	400	300	image/jpeg	19237	IMG_4608-400x300.jpg	\N	768	1024	image/jpeg	91415	IMG_4608-768x1024.jpg	\N	1024	1365	image/jpeg	161465	IMG_4608-1024x1365.jpg	\N	1920	2560	image/jpeg	579243	IMG_4608-1920x2560.jpg	\N	\N	\N	\N	\N	\N
25	Río de caramelo	Río de caramelo	100	1/1250	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-08-17 12:57:59+00	38.01212833333334	-2.861118333333333	\N	Unknown	Did not fire	2025-12-14 21:38:42.372+00	2025-12-14 21:38:42.372+00	\N	\N	IMG_4790.JPG	image/jpeg	28889992	6048	8064	50	50	\N	400	300	image/jpeg	41255	IMG_4790-400x300.jpg	\N	768	1024	image/jpeg	247758	IMG_4790-768x1024.jpg	\N	1024	1365	image/jpeg	449461	IMG_4790-1024x1365.jpg	\N	1920	2560	image/jpeg	1573459	IMG_4790-1920x2560.jpg	\N	3840	5120	image/jpeg	5540544	IMG_4790-3840x5120.jpg
26	Amanecer	Amanecer	125	1/120	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-08-28 06:02:03+00	37.884680555555555	-4.783327777777778	\N	Unknown	Did not fire	2025-12-14 21:38:43.308+00	2025-12-14 21:38:43.308+00	\N	\N	IMG_4878.jpg	image/jpeg	3892896	2826	3768	50	50	\N	400	300	image/jpeg	29796	IMG_4878-400x300.jpg	\N	768	1024	image/jpeg	146948	IMG_4878-768x1024.jpg	\N	1024	1365	image/jpeg	253789	IMG_4878-1024x1365.jpg	\N	1920	2560	image/jpeg	884907	IMG_4878-1920x2560.jpg	\N	\N	\N	\N	\N	\N
27	Pescadores	Pescadores	25	1/640	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-10-20 08:11:31+00	38.08597833333334	-4.926381666666667	\N	Unknown	Did not fire	2025-12-14 21:38:44.127+00	2025-12-14 21:38:44.127+00	\N	\N	IMG_5211.JPG	image/jpeg	4800627	3024	4032	50	50	\N	400	300	image/jpeg	13274	IMG_5211-400x300.jpg	\N	768	1024	image/jpeg	65998	IMG_5211-768x1024.jpg	\N	1024	1365	image/jpeg	128203	IMG_5211-1024x1365.jpg	\N	1920	2560	image/jpeg	543383	IMG_5211-1920x2560.jpg	\N	\N	\N	\N	\N	\N
28	Estación de tren	Estación de tren	80	1/120	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2024-11-15 14:59:11+00	37.888691666666666	-4.789386666666667	\N	Unknown	Did not fire	2025-12-14 21:38:45.742+00	2025-12-14 21:38:45.742+00	\N	\N	IMG_5367.JPG	image/jpeg	5348970	2974	3965	50	50	\N	400	300	image/jpeg	27309	IMG_5367-400x300.jpg	\N	768	1024	image/jpeg	134551	IMG_5367-768x1024.jpg	\N	1024	1365	image/jpeg	233542	IMG_5367-1024x1365.jpg	\N	1920	2560	image/jpeg	868816	IMG_5367-1920x2560.jpg	\N	\N	\N	\N	\N	\N
29	Juanita	Juanita	25	1/250	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2025-02-14 15:23:40+00	48.87918833333333	2.355618333333333	\N	Unknown	Did not fire	2025-12-14 21:38:49.092+00	2025-12-14 21:38:49.091+00	\N	\N	IMG_5728.JPG	image/jpeg	5679311	3024	4032	50	50	\N	400	300	image/jpeg	31775	IMG_5728-400x300.jpg	\N	768	1024	image/jpeg	158566	IMG_5728-768x1024.jpg	\N	1024	1365	image/jpeg	267341	IMG_5728-1024x1365.jpg	\N	1920	2560	image/jpeg	836563	IMG_5728-1920x2560.jpg	\N	\N	\N	\N	\N	\N
30	Avión	Avión	25	1/1100	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2025-02-15 10:53:59+00	48.860438333333335	2.3252783333333333	\N	Unknown	Did not fire	2025-12-14 21:38:49.975+00	2025-12-14 21:38:49.975+00	\N	\N	IMG_5743.JPG	image/jpeg	3553400	2538	3384	50	50	\N	400	300	image/jpeg	12622	IMG_5743-400x300.jpg	\N	768	1024	image/jpeg	102408	IMG_5743-768x1024.jpg	\N	1024	1365	image/jpeg	192711	IMG_5743-1024x1365.jpg	\N	1920	2560	image/jpeg	742521	IMG_5743-1920x2560.jpg	\N	\N	\N	\N	\N	\N
31	París	París	25	1/1100	f/2.8	9	Apple iPhone 15 Pro	iPhone 15 Pro back camera 9mm f/2.8	2025-02-16 13:29:38+00	48.863975	2.313363333333333	\N	Unknown	Did not fire	2025-12-14 21:38:50.741+00	2025-12-14 21:38:50.741+00	\N	\N	IMG_5805.JPG	image/jpeg	4133239	2886	3848	50	50	\N	400	300	image/jpeg	11036	IMG_5805-400x300.jpg	\N	768	1024	image/jpeg	69357	IMG_5805-768x1024.jpg	\N	1024	1365	image/jpeg	121932	IMG_5805-1024x1365.jpg	\N	1920	2560	image/jpeg	510600	IMG_5805-1920x2560.jpg	\N	\N	\N	\N	\N	\N
33	IMG_4571	\N	1000	1/30	f/1.8	7	Apple iPhone 15 Pro	iPhone 15 Pro back camera 6.765mm f/1.78	2024-07-29 14:41:54+00	43.43666388888889	-5.0736638888888885	\N	Unknown	Did not fire	2025-12-15 12:35:30.301+00	2025-12-15 12:35:30.301+00	\N	\N	IMG_4571-1.JPG	image/jpeg	3760562	3020	4026	50	50	\N	400	300	image/jpeg	27962	IMG_4571-1-400x300.jpg	\N	768	1024	image/jpeg	134782	IMG_4571-1-768x1024.jpg	\N	1024	1365	image/jpeg	230117	IMG_4571-1-1024x1365.jpg	\N	1920	2560	image/jpeg	730438	IMG_4571-1-1920x2560.jpg	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, users_id, media_id, categories_id, blog_id, photos_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2025-12-15 12:35:29.959+00	2025-12-02 15:11:24.517+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
1	collection-users	{"limit": 10, "editViewType": "default"}	2025-12-02 15:13:27.875+00	2025-12-02 15:13:19.331+00
3	collection-categories	{"editViewType": "default"}	2025-12-02 15:57:33.541+00	2025-12-02 15:57:32.108+00
6	collection-users	{}	2025-12-02 16:09:36.831+00	2025-12-02 16:09:36.831+00
4	collection-media	{"limit": 10, "editViewType": "default"}	2025-12-02 16:09:58.18+00	2025-12-02 15:59:01.854+00
2	collection-blog	{"limit": 10, "editViewType": "default"}	2025-12-02 16:14:50.224+00	2025-12-02 15:57:29.622+00
7	collection-blog-1	{"fields": {"content": {"collapsed": ["692f0ced54a5d375bd42d1fe"]}}}	2025-12-02 16:46:20.919+00	2025-12-02 16:40:16.659+00
8	collection-blog-2	{"fields": {"content": {"collapsed": []}}}	2025-12-10 21:30:17.487+00	2025-12-02 17:04:17.959+00
9	collection-photos	{"limit": 10, "editViewType": "default"}	2025-12-14 21:12:38.161+00	2025-12-14 21:12:32.285+00
5	nav	{"open": false, "groups": {"Collections": {"open": true}}}	2025-12-14 21:59:08.09+00	2025-12-02 16:02:20.256+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
6	\N	3	user	2
15	\N	6	user	2
16	\N	4	user	2
17	\N	2	user	2
20	\N	7	user	2
27	\N	8	user	2
30	\N	9	user	2
31	\N	5	user	2
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	2	8513b5f9-7ad1-46ab-84dd-57622b21a7e3	2025-12-14 21:08:43.745+00	2025-12-14 23:08:43.745+00
\.


--
-- Name: blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.blog_id_seq', 2, true);


--
-- Name: blog_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.blog_rels_id_seq', 11, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 2, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 7, true);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_kv_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 20, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 40, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 9, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 31, true);


--
-- Name: photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.photos_id_seq', 33, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

\unrestrict UljtuongzyN0xddgsJ9vI23VM20fH13hW2WiI08K0wkeSaTBibnjJQb337Hj62L

