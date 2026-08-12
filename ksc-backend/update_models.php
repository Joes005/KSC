<?php
$models = ['SiteSetting','NewsEvent','Facility','GalleryImage','Branch','PageContent'];
foreach($models as $m){
    $f = 'app/Models/'.$m.'.php';
    $c = file_get_contents($f);
    $c = str_replace('use HasFactory;', "use HasFactory;\n    protected \$guarded = [];", $c);
    file_put_contents($f, $c);
}
echo "Done\n";
